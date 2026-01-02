import { NextRequest, NextResponse } from 'next/server';
import { ReputationCalculator } from '@/lib/reputation/calculator';

/**
 * POST /api/reputation/endorse
 * Give a host endorsement to another user
 *
 * Body:
 * {
 *   giverId: string;      // User giving the endorsement
 *   receiverId: string;   // User receiving the endorsement
 *   sessionId?: string;   // Optional session context
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { giverId, receiverId, sessionId } = body;

    // Validation
    if (!giverId || !receiverId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: giverId, receiverId',
        },
        { status: 400 }
      );
    }

    // Can't endorse yourself
    if (giverId === receiverId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot endorse yourself',
        },
        { status: 400 }
      );
    }

    // Record the endorsement
    const endorsement = await ReputationCalculator.recordEndorsement(
      giverId,
      receiverId,
      sessionId
    );

    // Get updated reputation
    const reputation = await ReputationCalculator.getUserReputationDisplay(receiverId);

    return NextResponse.json({
      success: true,
      data: {
        endorsement,
        reputation,
      },
    });
  } catch (error: any) {
    console.error('Error recording endorsement:', error);

    // Handle duplicate endorsement
    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          error: 'You have already endorsed this user for this session',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to record endorsement',
      },
      { status: 500 }
    );
  }
}
