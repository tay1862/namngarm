import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Get site settings
export async function GET(request: NextRequest) {
  try {
    const settings = await prisma.siteSettings.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!settings) {
      // Return default settings if none exist
      return NextResponse.json({
        success: true,
        data: {
          siteName_lo: 'NAMNGAM',
          siteName_th: 'NAMNGAM',
          siteName_zh: 'NAMNGAM',
          siteName_en: 'NAMNGAM',
          defaultMetaDesc_lo: '',
          defaultMetaDesc_th: '',
          defaultMetaDesc_zh: '',
          defaultMetaDesc_en: '',
          email: '',
          phone: '',
          address_lo: '',
          address_th: '',
          address_zh: '',
          address_en: '',
          facebookPage: '',
          lineId: '',
          whatsapp: '',
          logo: '',
          homeBg: '',
          heroWelcome_lo: 'ຍິນດີຕ້ອນຮັບສູ່',
          heroWelcome_th: 'ยินดีต้อนรับสู่',
          heroWelcome_zh: '欢迎来到',
          heroWelcome_en: 'Welcome to',
          heroTitle_lo: 'NAMNGAM ORIGINAL',
          heroTitle_th: 'NAMNGAM ORIGINAL',
          heroTitle_zh: 'NAMNGAM ORIGINAL',
          heroTitle_en: 'NAMNGAM ORIGINAL',
          heroSubtitle_lo: 'ຄຸນນະພາບ ແລະ ຄວາມງາມທີ່ແທ້ຈິງ',
          heroSubtitle_th: 'คุณภาพและความงามที่แท้จริง',
          heroSubtitle_zh: '真正的品质与美丽',
          heroSubtitle_en: 'Quality & Beauty',
          heroBadgeImage: '',
          heroBadgeText_lo: 'Available Now',
          heroBadgeText_th: 'Available Now',
          heroBadgeText_zh: 'Available Now',
          heroBadgeText_en: 'Available Now',
          heroDesignImage: '',
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Settings fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT - Update site settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Get existing settings
    const existing = await prisma.siteSettings.findFirst();

    let settings;
    if (existing) {
      // Update existing
      settings = await prisma.siteSettings.update({
        where: { id: existing.id },
        data: body,
      });
    } else {
      // Create new
      settings = await prisma.siteSettings.create({
        data: body,
      });
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
