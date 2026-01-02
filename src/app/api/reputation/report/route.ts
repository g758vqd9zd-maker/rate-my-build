import { NextRequest, NextResponse } from 'next/server';
import { ReputationCalculator } from '@/lib/reputation/calculator';
import { PrismaClient, ReportReason } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * POST /api/reputation/report
 * Report a user for toxic behavior
 *
 * Body:
 * {
 *   reporterId: string;
 *   reportedId: string;
 *   reason: ReportReason;
 *   details?: string;
 *   sessionId?: string;
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reporterId, reportedId, reason, details, sessionId } = body;

    // Validation
    if (!reporterId || !reportedId || !reason) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: reporterId, reportedId, reason',
        },
        { status: 400 }
      );
    }

    // Can't report yourself
    if (reporterId === reportedId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot report yourself',
        },
        { status: 400 }
      );
    }

    // Create the report
    const report = await prisma.report.create({
      data: {
        reporterId,
        reportedId,
        reason: reason as ReportReason,
        details,
        sessionId,
      },
    });

    // If toxic behavior, apply reputation penalty immediately
    if (reason === 'TOXIC_BEHAVIOR' || reason === 'HARASSMENT') {
      await ReputationCalculator.recordToxicBehavior(
        reportedId,
        sessionId,
        details
      );
    }

    // Get updated reputation
    const reputation = await ReputationCalculator.getUserReputationDisplay(reportedId);

    return NextResponse.json({
      success: true,
      data: {
        report,
        reputation,
      },
    });
  } catch (error) {
    console.error('Error recording report:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to record report',
      },
      { status: 500 }
    );
  }
}
