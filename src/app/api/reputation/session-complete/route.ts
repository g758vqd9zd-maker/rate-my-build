import { NextRequest, NextResponse } from 'next/server';
import { ReputationCalculator } from '@/lib/reputation/calculator';
import { ParticipantStatus } from '@prisma/client';

/**
 * POST /api/reputation/session-complete
 * Record session completion and update reputation
 *
 * Body:
 * {
 *   userId: string;
 *   sessionId: string;
 *   status: ParticipantStatus;
 *   minutesLate?: number;
 *   completionPercent?: number;
 *   wasKicked?: boolean;
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      sessionId,
      status,
      minutesLate,
      completionPercent,
      wasKicked = false,
    } = body;

    // Validation
    if (!userId || !sessionId || !status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: userId, sessionId, status',
        },
        { status: 400 }
      );
    }

    // Record the session completion
    const scoreChange = await ReputationCalculator.recordSessionCompletion(
      userId,
      sessionId,
      {
        status: status as ParticipantStatus,
        minutesLate,
        completionPercent,
        wasKicked,
      }
    );

    // Get updated reputation
    const reputation = await ReputationCalculator.getUserReputationDisplay(userId);

    return NextResponse.json({
      success: true,
      data: {
        scoreChange,
        reputation,
      },
    });
  } catch (error) {
    console.error('Error recording session completion:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to record session completion',
      },
      { status: 500 }
    );
  }
}
