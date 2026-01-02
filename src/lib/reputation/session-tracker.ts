/**
 * SESSION TRACKING UTILITIES
 *
 * Helper functions to track user behavior during gaming sessions
 */

import { PrismaClient, SessionStatus, ParticipantStatus } from '@prisma/client';
import { ReputationCalculator } from './calculator';

const prisma = new PrismaClient();

export class SessionTracker {
  /**
   * Create a new session
   */
  static async createSession(
    hostId: string,
    data: {
      title: string;
      description?: string;
      scheduledStart: Date;
      scheduledEnd?: Date;
    }
  ) {
    return await prisma.session.create({
      data: {
        hostId,
        ...data,
        status: SessionStatus.SCHEDULED,
      },
    });
  }

  /**
   * Add participant to session
   */
  static async addParticipant(sessionId: string, userId: string) {
    return await prisma.sessionParticipant.create({
      data: {
        sessionId,
        userId,
        status: ParticipantStatus.REGISTERED,
      },
    });
  }

  /**
   * Start a session
   */
  static async startSession(sessionId: string) {
    return await prisma.session.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.IN_PROGRESS,
        actualStart: new Date(),
      },
    });
  }

  /**
   * Mark participant as joined
   */
  static async markParticipantJoined(sessionId: string, userId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session || !session.actualStart) {
      throw new Error('Session has not started yet');
    }

    const now = new Date();
    const minutesLate = Math.max(
      0,
      Math.floor((now.getTime() - session.scheduledStart.getTime()) / (1000 * 60))
    );

    return await prisma.sessionParticipant.update({
      where: {
        sessionId_userId: { sessionId, userId },
      },
      data: {
        status: ParticipantStatus.JOINED,
        joinedAt: now,
        minutesLate: minutesLate > 0 ? minutesLate : undefined,
      },
    });
  }

  /**
   * Complete a session and calculate reputation for all participants
   */
  static async completeSession(sessionId: string) {
    const session = await prisma.session.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.COMPLETED,
        actualEnd: new Date(),
      },
      include: {
        participants: true,
      },
    });

    if (!session.actualStart || !session.actualEnd) {
      throw new Error('Session must have start and end times');
    }

    const sessionDuration = session.actualEnd.getTime() - session.actualStart.getTime();

    // Process each participant
    for (const participant of session.participants) {
      let status = participant.status;
      let completionPercent = 100;

      // Determine final status
      if (!participant.joinedAt) {
        // Never joined = No-show
        status = ParticipantStatus.NO_SHOW;
        completionPercent = 0;
      } else if (participant.leftAt) {
        // Left early - calculate completion %
        const timeInSession = participant.leftAt.getTime() - participant.joinedAt.getTime();
        completionPercent = Math.floor((timeInSession / sessionDuration) * 100);
        status = ParticipantStatus.LEFT_EARLY;
      } else if (participant.wasKicked) {
        status = ParticipantStatus.KICKED;
        completionPercent = participant.completionPercent || 0;
      } else {
        // Completed successfully
        status = ParticipantStatus.COMPLETED;
      }

      // Update participant record
      await prisma.sessionParticipant.update({
        where: { id: participant.id },
        data: {
          status,
          completionPercent,
        },
      });

      // Update reputation
      await ReputationCalculator.recordSessionCompletion(
        participant.userId,
        sessionId,
        {
          status,
          minutesLate: participant.minutesLate,
          completionPercent,
          wasKicked: participant.wasKicked,
        }
      );
    }

    return session;
  }

  /**
   * Mark participant as left early
   */
  static async markParticipantLeftEarly(sessionId: string, userId: string) {
    return await prisma.sessionParticipant.update({
      where: {
        sessionId_userId: { sessionId, userId },
      },
      data: {
        leftAt: new Date(),
        status: ParticipantStatus.LEFT_EARLY,
      },
    });
  }

  /**
   * Kick participant from session
   */
  static async kickParticipant(sessionId: string, userId: string) {
    return await prisma.sessionParticipant.update({
      where: {
        sessionId_userId: { sessionId, userId },
      },
      data: {
        wasKicked: true,
        kickedAt: new Date(),
        status: ParticipantStatus.KICKED,
      },
    });
  }

  /**
   * Cancel participant registration
   */
  static async cancelParticipant(
    sessionId: string,
    userId: string,
    sessionStartTime: Date
  ) {
    const now = new Date();
    const hoursBeforeStart = (sessionStartTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    // Update participant status
    await prisma.sessionParticipant.update({
      where: {
        sessionId_userId: { sessionId, userId },
      },
      data: {
        status: ParticipantStatus.CANCELLED,
        cancelledAt: now,
      },
    });

    // Apply reputation penalty if within 2 hours
    if (hoursBeforeStart < 2) {
      await ReputationCalculator.recordCancellation(
        userId,
        sessionId,
        hoursBeforeStart
      );
    }

    return { hoursBeforeStart, penaltyApplied: hoursBeforeStart < 2 };
  }

  /**
   * Get session stats
   */
  static async getSessionStats(sessionId: string) {
    const participants = await prisma.sessionParticipant.findMany({
      where: { sessionId },
      include: {
        user: {
          include: {
            reputation: true,
          },
        },
      },
    });

    const stats = {
      total: participants.length,
      joined: participants.filter(p => p.joinedAt).length,
      noShows: participants.filter(p => p.status === ParticipantStatus.NO_SHOW).length,
      completed: participants.filter(p => p.status === ParticipantStatus.COMPLETED).length,
      leftEarly: participants.filter(p => p.status === ParticipantStatus.LEFT_EARLY).length,
      kicked: participants.filter(p => p.wasKicked).length,
      late: participants.filter(p => p.minutesLate && p.minutesLate > 0).length,
    };

    return { participants, stats };
  }

  /**
   * Get user's session history
   */
  static async getUserSessionHistory(userId: string, limit: number = 20) {
    return await prisma.sessionParticipant.findMany({
      where: { userId },
      include: {
        session: {
          include: {
            host: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }
}

export default SessionTracker;
