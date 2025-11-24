import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/lib/performance';
import { formatErrorResponse, logError } from '@/lib/error-handler';

// GET - Fetch active quick links
export async function GET(request: NextRequest) {
    try {
        // Try to get from cache first
        const cachedLinks = cache.get('public_quick_links');
        if (cachedLinks) {
            return NextResponse.json({
                success: true,
                data: cachedLinks,
            });
        }

        // Fetch from database
        const quickLinks = await prisma.quickLink.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });

        cache.set('public_quick_links', quickLinks, 300); // 5 minutes cache
        return NextResponse.json({
            success: true,
            data: quickLinks,
        });
    } catch (error: any) {
        logError(error, 'Quick Links API - GET');
        return NextResponse.json(
            formatErrorResponse(error),
            { status: error.statusCode || 500 }
        );
    }
}
