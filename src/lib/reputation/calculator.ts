/**
 * REPUTATION CALCULATION ENGINE
 *
 * Base Score: 3.0 (new users start here)
 * Range: 0.0 - 5.0
 */

import { PrismaClient, ReputationEventType, ParticipantStatus } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================
// SCORING CONSTANTS
// ============================================
export const REPUTATION_CONFIG = {
  // Base & Limits
  BASE_SCORE: 3.0,
  MIN_SCORE: 0.0,
  MAX_SCORE: 5.0,

  // Score Increases
  SESSION_COMPLETED: 0.02,
  SESSION_ON_TIME: 0.03,
  HOST_ENDORSEMENT: 0.05,
  STREAK_BONUS_AT_10: 0.10,
  SEASON_COMPLETION: 0.15,

  // Score Decreases
  LATE_10_20_MIN: -0.05,
  NO_SHOW: -0.15,
  LEAVE_EARLY: -0.10,        // <70% session completion
  CANCEL_WITHIN_2H: -0.08,
  TOXIC_BEHAVIOR: -0.25,
  KICKED_FROM_GROUP: -0.20,

  // Decay & Forgiveness
  DECAY_DAYS: 90,             // Events older than 90 days get reduced weight
  DECAY_WEIGHT: 0.5,          // 50% weight for old events
  GRACE_PERIOD_SESSIONS: 5,   // First 5 sessions, mistakes don't count
  SEASONAL_DRIFT_TARGET: 3.5, // Soft reset drifts toward this

  // Thresholds
  LATE_THRESHOLD_MIN: 10,     // Minutes late before penalty
  LATE_THRESHOLD_MAX: 20,     // Past this = no-show
  COMPLETION_THRESHOLD: 70,   // % of session needed to avoid "left early"
  CANCEL_WINDOW_HOURS: 2,     // Hours before session start
};

// ============================================
// REPUTATION CALCULATOR CLASS
// ============================================
export class ReputationCalculator {
  /**
   * Initialize new user reputation
   */
  static async initializeUserReputation(userId: string) {
    return await prisma.reputation.create({
      data: {
        userId,
        currentScore: REPUTATION_CONFIG.BASE_SCORE,
        isGracePeriod: true,
        graceSessions: 0,
      },
    });
  }

  /**
   * Get or create user reputation
   */
  static async getOrCreateReputation(userId: string) {
    let reputation = await prisma.reputation.findUnique({
      where: { userId },
      include: { events: true },
    });

    if (!reputation) {
      reputation = await this.initializeUserReputation(userId);
    }

    return reputation;
  }

  /**
   * Record a session completion
   */
  static async recordSessionCompletion(
    userId: string,
    sessionId: string,
    participant: {
      minutesLate?: number;
      completionPercent?: number;
      wasKicked: boolean;
      status: ParticipantStatus;
    }
  ) {
    const reputation = await this.getOrCreateReputation(userId);
    const events: Array<{ type: ReputationEventType; change: number; reason: string }> = [];

    // Check if in grace period
    const inGracePeriod = reputation.isGracePeriod && reputation.graceSessions < REPUTATION_CONFIG.GRACE_PERIOD_SESSIONS;

    // Determine what happened
    if (participant.status === ParticipantStatus.NO_SHOW) {
      // NO-SHOW: -0.15
      if (!inGracePeriod) {
        events.push({
          type: ReputationEventType.NO_SHOW,
          change: REPUTATION_CONFIG.NO_SHOW,
          reason: 'Did not show up for session',
        });
      }
    } else if (participant.wasKicked) {
      // KICKED: -0.20
      if (!inGracePeriod) {
        events.push({
          type: ReputationEventType.KICKED_FROM_GROUP,
          change: REPUTATION_CONFIG.KICKED_FROM_GROUP,
          reason: 'Kicked from session',
        });
      }
    } else if (participant.status === ParticipantStatus.COMPLETED) {
      // Session completed!

      // Check completion percentage
      const completion = participant.completionPercent || 100;
      if (completion < REPUTATION_CONFIG.COMPLETION_THRESHOLD) {
        // Left early: -0.10
        if (!inGracePeriod) {
          events.push({
            type: ReputationEventType.EARLY_LEAVE,
            change: REPUTATION_CONFIG.LEAVE_EARLY,
            reason: `Left early (${completion}% completion)`,
          });
        }
      } else {
        // Good completion! +0.02
        events.push({
          type: ReputationEventType.SESSION_COMPLETED,
          change: REPUTATION_CONFIG.SESSION_COMPLETED,
          reason: 'Completed session',
        });

        // Check if on time
        const minutesLate = participant.minutesLate || 0;
        if (minutesLate === 0) {
          // On time: +0.03
          events.push({
            type: ReputationEventType.SESSION_ON_TIME,
            change: REPUTATION_CONFIG.SESSION_ON_TIME,
            reason: 'Arrived on time',
          });
        } else if (minutesLate >= REPUTATION_CONFIG.LATE_THRESHOLD_MIN && minutesLate <= REPUTATION_CONFIG.LATE_THRESHOLD_MAX) {
          // Late (10-20 min): -0.05
          if (!inGracePeriod) {
            events.push({
              type: ReputationEventType.LATE_ARRIVAL,
              change: REPUTATION_CONFIG.LATE_10_20_MIN,
              reason: `Arrived ${minutesLate} minutes late`,
            });
          }
        }

        // Update streak
        const newStreak = reputation.currentStreak + 1;
        if (newStreak % 10 === 0) {
          // Streak bonus at every 10: +0.10
          events.push({
            type: ReputationEventType.STREAK_BONUS,
            change: REPUTATION_CONFIG.STREAK_BONUS_AT_10,
            reason: `${newStreak} session streak!`,
          });
        }

        // Add to good sessions bank (for forgiveness)
        await prisma.reputation.update({
          where: { userId },
          data: {
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, reputation.longestStreak),
            goodSessionsBank: reputation.goodSessionsBank + 1,
          },
        });
      }
    }

    // Apply all events
    let totalChange = 0;
    for (const event of events) {
      totalChange += event.change;

      await prisma.reputationEvent.create({
        data: {
          reputationId: reputation.id,
          eventType: event.type,
          scoreChange: event.change,
          reason: event.reason,
          sessionId,
        },
      });
    }

    // Update reputation stats
    await prisma.reputation.update({
      where: { userId },
      data: {
        totalSessions: { increment: 1 },
        completedSessions: participant.status === ParticipantStatus.COMPLETED ? { increment: 1 } : undefined,
        noShows: participant.status === ParticipantStatus.NO_SHOW ? { increment: 1 } : undefined,
        lateArrivals: (participant.minutesLate || 0) >= REPUTATION_CONFIG.LATE_THRESHOLD_MIN ? { increment: 1 } : undefined,
        earlyLeaves: (participant.completionPercent || 100) < REPUTATION_CONFIG.COMPLETION_THRESHOLD ? { increment: 1 } : undefined,
        graceSessions: inGracePeriod ? { increment: 1 } : undefined,
        isGracePeriod: inGracePeriod && reputation.graceSessions + 1 >= REPUTATION_CONFIG.GRACE_PERIOD_SESSIONS ? false : undefined,
        lastSessionAt: new Date(),
      },
    });

    // Recalculate total score
    await this.recalculateScore(userId);

    return totalChange;
  }

  /**
   * Record a host endorsement
   */
  static async recordEndorsement(giverId: string, receiverId: string, sessionId?: string) {
    // Create endorsement
    const endorsement = await prisma.endorsement.create({
      data: {
        giverId,
        receiverId,
        sessionId,
        value: REPUTATION_CONFIG.HOST_ENDORSEMENT,
      },
    });

    // Add reputation event
    const reputation = await this.getOrCreateReputation(receiverId);
    await prisma.reputationEvent.create({
      data: {
        reputationId: reputation.id,
        eventType: ReputationEventType.HOST_ENDORSEMENT,
        scoreChange: REPUTATION_CONFIG.HOST_ENDORSEMENT,
        reason: 'Received host endorsement',
        sessionId,
      },
    });

    // Recalculate score
    await this.recalculateScore(receiverId);

    return endorsement;
  }

  /**
   * Record a toxic behavior report
   */
  static async recordToxicBehavior(userId: string, sessionId?: string, reason?: string) {
    const reputation = await this.getOrCreateReputation(userId);

    await prisma.reputationEvent.create({
      data: {
        reputationId: reputation.id,
        eventType: ReputationEventType.TOXIC_BEHAVIOR,
        scoreChange: REPUTATION_CONFIG.TOXIC_BEHAVIOR,
        reason: reason || 'Reported for toxic behavior',
        sessionId,
      },
    });

    await this.recalculateScore(userId);
  }

  /**
   * Record session cancellation
   */
  static async recordCancellation(userId: string, sessionId: string, hoursBeforeStart: number) {
    const reputation = await this.getOrCreateReputation(userId);

    if (hoursBeforeStart < REPUTATION_CONFIG.CANCEL_WINDOW_HOURS) {
      await prisma.reputationEvent.create({
        data: {
          reputationId: reputation.id,
          eventType: ReputationEventType.CANCELLATION,
          scoreChange: REPUTATION_CONFIG.CANCEL_WITHIN_2H,
          reason: `Cancelled ${hoursBeforeStart.toFixed(1)}h before session`,
          sessionId,
        },
      });

      await prisma.reputation.update({
        where: { userId },
        data: {
          cancellations: { increment: 1 },
          currentStreak: 0, // Break streak
        },
      });

      await this.recalculateScore(userId);
    }
  }

  /**
   * Recalculate total score with decay applied
   */
  static async recalculateScore(userId: string) {
    const reputation = await prisma.reputation.findUnique({
      where: { userId },
      include: { events: { orderBy: { createdAt: 'desc' } } },
    });

    if (!reputation) return;

    const now = new Date();
    const decayThreshold = new Date(now.getTime() - REPUTATION_CONFIG.DECAY_DAYS * 24 * 60 * 60 * 1000);

    let totalScore = REPUTATION_CONFIG.BASE_SCORE;

    // Apply all events with decay
    for (const event of reputation.events) {
      let eventScore = event.scoreChange;

      // Apply decay to old events
      if (event.createdAt < decayThreshold && !event.decayApplied) {
        eventScore = eventScore * REPUTATION_CONFIG.DECAY_WEIGHT;

        // Mark as decayed
        await prisma.reputationEvent.update({
          where: { id: event.id },
          data: {
            decayApplied: true,
            decayedScore: eventScore,
          },
        });
      } else if (event.decayApplied && event.decayedScore !== null) {
        eventScore = event.decayedScore;
      }

      totalScore += eventScore;
    }

    // Forgiveness system: Use good sessions bank to offset bad ones
    if (reputation.goodSessionsBank > 0) {
      // Find most recent negative events that haven't been forgiven
      const negativeEvents = reputation.events.filter(
        e => e.scoreChange < 0 && !e.decayApplied
      ).slice(0, reputation.goodSessionsBank);

      for (const negEvent of negativeEvents) {
        totalScore -= negEvent.scoreChange; // Remove the penalty
      }

      // Consume good sessions bank
      await prisma.reputation.update({
        where: { userId },
        data: {
          goodSessionsBank: Math.max(0, reputation.goodSessionsBank - negativeEvents.length),
        },
      });
    }

    // Clamp to range
    totalScore = Math.max(REPUTATION_CONFIG.MIN_SCORE, Math.min(REPUTATION_CONFIG.MAX_SCORE, totalScore));

    // Update score
    await prisma.reputation.update({
      where: { userId },
      data: {
        currentScore: totalScore,
        updatedAt: new Date(),
      },
    });

    return totalScore;
  }

  /**
   * Apply seasonal soft reset (drift toward 3.5)
   */
  static async applySeasonalReset(userId: string, driftFactor: number = 0.1) {
    const reputation = await this.getOrCreateReputation(userId);

    const currentScore = reputation.currentScore;
    const targetScore = REPUTATION_CONFIG.SEASONAL_DRIFT_TARGET;
    const newScore = currentScore + (targetScore - currentScore) * driftFactor;

    await prisma.reputationEvent.create({
      data: {
        reputationId: reputation.id,
        eventType: ReputationEventType.SEASONAL_RESET,
        scoreChange: newScore - currentScore,
        reason: 'Seasonal soft reset',
      },
    });

    await prisma.reputation.update({
      where: { userId },
      data: {
        currentScore: newScore,
      },
    });

    return newScore;
  }

  /**
   * Get user reputation with display formatting
   */
  static async getUserReputationDisplay(userId: string) {
    const reputation = await this.getOrCreateReputation(userId);

    // Calculate star display
    const stars = Math.round(reputation.currentScore); // 0-5 stars
    const starDisplay = '⭐'.repeat(stars);

    return {
      score: reputation.currentScore,
      stars: starDisplay,
      totalGames: reputation.totalSessions,
      display: `${starDisplay} ${reputation.currentScore.toFixed(1)} (${reputation.totalSessions} games)`,
      stats: {
        completed: reputation.completedSessions,
        noShows: reputation.noShows,
        lateArrivals: reputation.lateArrivals,
        currentStreak: reputation.currentStreak,
        longestStreak: reputation.longestStreak,
      },
    };
  }
}

export default ReputationCalculator;
