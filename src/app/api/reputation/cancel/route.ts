import { NextRequest, NextResponse } from 'next/server';
import { ReputationCalculator } from '@/lib/reputation/calculator';

/**
 * POST /api/reputation/cancel
 * Record session cancellation
 *
 * Body:
 * {
 *   userId: string;
 *   sessionId: string;
 *   sessionStartTime: string; // ISO datetime
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, sessionId, sessionStartTime } = body;

    // Validation
    if (!userId || !sessionId || !sessionStartTime) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: userId, sessionId, sessionStartTime',
        },
        { status: 400 }
      );
    }

    // Calculate hours before session start
    const now = new Date();
    const startTime = new Date(sessionStartTime);
    const hoursBeforeStart = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursBeforeStart < 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot cancel a session that has already started',
        },
        { status: 400 }
      );
    }

    // Record the cancellation
    await ReputationCalculator.recordCancellation(
      userId,
      sessionId,
      hoursBeforeStart
    );

    // Get updated reputation
    const reputation = await ReputationCalculator.getUserReputationDisplay(userId);

    return NextResponse.json({
      success: true,
      data: {
        hoursBeforeStart,
        penaltyApplied: hoursBeforeStart < 2,
        reputation,
      },
    });
  } catch (error) {
    console.error('Error recording cancellation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to record cancellation',
      },
      { status: 500 }
    );
  }
}
