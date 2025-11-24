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
        let quickLinks = await prisma.quickLink.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });

        // If no quick links found, fall back to Site Settings
        if (quickLinks.length === 0) {
            const settings = await prisma.siteSettings.findUnique({
                where: { id: 'site_settings' }
            });

            if (settings) {
                const virtualLinks: any[] = [];
                let orderCounter = 0;

                // Add WhatsApp if exists
                if (settings.whatsapp) {
                    virtualLinks.push({
                        id: 'virtual-whatsapp',
                        type: 'WHATSAPP',
                        label_lo: 'WhatsApp',
                        label_en: 'WhatsApp',
                        url: `https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`,
                        order: orderCounter++,
                        isActive: true
                    });
                }

                // Add Facebook if exists
                if (settings.facebookPage) {
                    virtualLinks.push({
                        id: 'virtual-facebook',
                        type: 'FACEBOOK',
                        label_lo: 'Facebook',
                        label_en: 'Facebook',
                        url: settings.facebookPage,
                        order: orderCounter++,
                        isActive: true
                    });
                }

                // Add LINE if exists
                if (settings.lineId) {
                    virtualLinks.push({
                        id: 'virtual-line',
                        type: 'LINE',
                        label_lo: 'LINE',
                        label_en: 'LINE',
                        url: `https://line.me/ti/p/~${settings.lineId}`,
                        order: orderCounter++,
                        isActive: true
                    });
                }

                // Add Phone if exists
                if (settings.phone) {
                    virtualLinks.push({
                        id: 'virtual-phone',
                        type: 'PHONE',
                        label_lo: 'ໂທຫາພວກເຮົາ',
                        label_en: 'Call Us',
                        url: `tel:${settings.phone}`,
                        order: orderCounter++,
                        isActive: true
                    });
                }

                quickLinks = virtualLinks;
            }
        }

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
