// @ts-ignore
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/lib/performance';
import { formatErrorResponse, logError } from '@/lib/error-handler';

// GET - Fetch public settings (no authentication required)
export async function GET(request: NextRequest) {
  try {
    // Try to get from cache first
    const cachedSettings = cache.get('public_site_settings');
    if (cachedSettings) {
      return NextResponse.json({
        success: true,
        data: cachedSettings
      });
    }

    // Fetch from database
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'site_settings' },
      select: {
        // Only include public-safe fields
        siteName_lo: true,

        siteName_en: true,
        homeBg: true,
        productsBg: true,
        articlesBg: true,
        heroWelcome_lo: true,

        heroWelcome_en: true,
        heroTitle_lo: true,

        heroTitle_en: true,
        heroSubtitle_lo: true,

        heroSubtitle_en: true,

        heroDesignImage: true,
        email: true,
        phone: true,
        address_lo: true,

        address_en: true,
        whatsapp: true,
        whatsappMessage_lo: true,

        whatsappMessage_en: true,
        facebookPage: true,
        lineId: true,
        defaultMetaDesc_lo: true,

        defaultMetaDesc_en: true,
        isUnderMaintenance: true,
        maintenanceMessage_lo: true,

        maintenanceMessage_en: true,
        updatedAt: true
      }
    });

    if (!settings) {
      // Return default empty settings if not found
      const defaultSettings = {
        siteName_lo: '',

        siteName_en: '',
        homeBg: '',
        productsBg: '',
        articlesBg: '',
        heroWelcome_lo: '',

        heroWelcome_en: '',
        heroTitle_lo: '',

        heroTitle_en: '',
        heroSubtitle_lo: '',

        heroSubtitle_en: '',

        heroDesignImage: '',
        email: '',
        phone: '',
        address_lo: '',

        address_en: '',
        whatsapp: '',
        whatsappMessage_lo: '',

        whatsappMessage_en: '',
        facebookPage: '',
        lineId: '',
        defaultMetaDesc_lo: '',

        defaultMetaDesc_en: '',
        isUnderMaintenance: false,
        maintenanceMessage_lo: '',

        maintenanceMessage_en: '',
        updatedAt: new Date()
      };

      cache.set('public_site_settings', defaultSettings, 300); // 5 minutes cache
      return NextResponse.json({
        success: true,
        data: defaultSettings
      });
    }

    cache.set('public_site_settings', settings, 300); // 5 minutes cache
    return NextResponse.json({
      success: true,
      data: settings
    });
  } catch (error: any) {
    logError(error, 'Public Settings API - GET');
    return NextResponse.json(
      formatErrorResponse(error),
      { status: error.statusCode || 500 }
    );
  }
}