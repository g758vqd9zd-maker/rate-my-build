import { NextRequest, NextResponse } from 'next/server';
import { ReputationCalculator } from '@/lib/reputation/calculator';

/**
 * GET /api/reputation/[userId]
 * Get user reputation data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    const reputationDisplay = await ReputationCalculator.getUserReputationDisplay(userId);

    return NextResponse.json({
      success: true,
      data: reputationDisplay,
    });
  } catch (error) {
    console.error('Error fetching reputation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch reputation',
      },
      { status: 500 }
    );
  }
}
