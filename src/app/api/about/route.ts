import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET about page content
export async function GET() {
  try {
    const aboutPage = await prisma.aboutPage.findUnique({
      where: { id: 'about_page' },
      include: {
        values: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!aboutPage) {
      // Create default about page if not exists
      const defaultAboutPage = await prisma.aboutPage.create({
        data: {
          id: 'about_page',
          storyParagraph1_lo: 'NAMNGAM ORIGINAL ເປັນແບຣນທີ່ມຸ່ງໝັ້ນໃນການນຳສະເໜີສິນຄ້າທີ່ມີຄຸນນະພາບ ແລະ ການບໍລິການທີ່ດີທີ່ສຸດໃຫ້ກັບລູກຄ້າທຸກທ່ານ.',
          storyParagraph1_th: 'NAMNGAM ORIGINAL เป็นแบรนด์ที่มุ่งมั่นในการนำเสนอสินค้าที่มีคุณภาพ และการบริการที่ดีที่สุดให้กับลูกค้าทุกท่าน',
          storyParagraph1_zh: 'NAMNGAM ORIGINAL 是一个致力于为每一位客户提供优质产品和最佳服务的品牌。',
          storyParagraph1_en: 'NAMNGAM ORIGINAL is a brand committed to presenting quality products and the best service to all our customers.',
          storyParagraph2_lo: 'ພວກເຮົາເຊື່ອວ່າ ຄຸນນະພາບແລະຄວາມງາມທີ່ແທ້ຈິງ ແມ່ນສິ່ງທີ່ທຸກຄົນສົມຄວນໄດ້ຮັບ.',
          storyParagraph2_th: 'เราเชื่อว่า คุณภาพและความงามที่แท้จริง คือสิ่งที่ทุกคนสมควรได้รับ',
          storyParagraph2_zh: '我们相信，真正的品质和美丽是每个人都应该拥有的。',
          storyParagraph2_en: 'We believe that true quality and beauty are what everyone deserves.',
          values: {
            create: [
              {
                icon: '💎',
                title_lo: 'ຄຸນນະພາບ',
                title_th: 'คุณภาพ',
                title_zh: '品质',
                title_en: 'Quality',
                description_lo: 'ສິນຄ້າທຸກຊິ້ນຜ່ານການຄັດເລືອກຢ່າງພິຖີພິຖັນ',
                description_th: 'สินค้าทุกชิ้นผ่านการคัดสรรอย่างพิถีพิถัน',
                description_zh: '每件产品都经过精心挑选',
                description_en: 'Every product is carefully selected',
                order: 0,
              },
              {
                icon: '✨',
                title_lo: 'ຄວາມງາມ',
                title_th: 'ความงาม',
                title_zh: '美丽',
                title_en: 'Beauty',
                description_lo: 'ອອກແບບສວຍງາມ ທັນສະໄໝ',
                description_th: 'ออกแบบสวยงาม ทันสมัย',
                description_zh: '设计精美，时尚现代',
                description_en: 'Beautiful design, modern style',
                order: 1,
              },
              {
                icon: '🤝',
                title_lo: 'ບໍລິການ',
                title_th: 'บริการ',
                title_zh: '服务',
                title_en: 'Service',
                description_lo: 'ພ້ອມໃຫ້ຄຳປຶກສາ ດ້ວຍຄວາມເປັນມິດ',
                description_th: 'พร้อมให้คำปรึกษา ด้วยความเป็นมิตร',
                description_zh: '友好地提供咨询服务',
                description_en: 'Ready to provide friendly consultation',
                order: 2,
              },
            ],
          },
        },
        include: {
          values: {
            orderBy: { order: 'asc' },
          },
        },
      });

      return NextResponse.json({
        success: true,
        data: defaultAboutPage,
      });
    }

    return NextResponse.json({
      success: true,
      data: aboutPage,
    });
  } catch (error) {
    console.error('Failed to fetch about page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch about page content' },
      { status: 500 }
    );
  }
}

// PUT - Update about page content
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      title_lo,
      title_th,
      title_zh,
      title_en,
      storyTitle_lo,
      storyTitle_th,
      storyTitle_zh,
      storyTitle_en,
      storyParagraph1_lo,
      storyParagraph1_th,
      storyParagraph1_zh,
      storyParagraph1_en,
      storyParagraph2_lo,
      storyParagraph2_th,
      storyParagraph2_zh,
      storyParagraph2_en,
      backgroundImage,
      values,
    } = body;

    // Update about page
    const aboutPage = await prisma.aboutPage.upsert({
      where: { id: 'about_page' },
      update: {
        title_lo,
        title_th,
        title_zh,
        title_en,
        storyTitle_lo,
        storyTitle_th,
        storyTitle_zh,
        storyTitle_en,
        storyParagraph1_lo,
        storyParagraph1_th,
        storyParagraph1_zh,
        storyParagraph1_en,
        storyParagraph2_lo,
        storyParagraph2_th,
        storyParagraph2_zh,
        storyParagraph2_en,
        backgroundImage,
      },
      create: {
        id: 'about_page',
        title_lo,
        title_th,
        title_zh,
        title_en,
        storyTitle_lo,
        storyTitle_th,
        storyTitle_zh,
        storyTitle_en,
        storyParagraph1_lo,
        storyParagraph1_th,
        storyParagraph1_zh,
        storyParagraph1_en,
        storyParagraph2_lo,
        storyParagraph2_th,
        storyParagraph2_zh,
        storyParagraph2_en,
        backgroundImage,
      },
    });

    // Handle values (company values/principles)
    if (values && Array.isArray(values)) {
      // Delete existing values
      await prisma.aboutValue.deleteMany({
        where: { aboutPageId: 'about_page' },
      });

      // Create new values
      if (values.length > 0) {
        await prisma.aboutValue.createMany({
          data: values.map((value, index) => ({
            aboutPageId: 'about_page',
            icon: value.icon,
            title_lo: value.title_lo,
            title_th: value.title_th,
            title_zh: value.title_zh,
            title_en: value.title_en,
            description_lo: value.description_lo,
            description_th: value.description_th,
            description_zh: value.description_zh,
            description_en: value.description_en,
            order: index,
          })),
        });
      }
    }

    // Fetch updated page with values
    const updatedPage = await prisma.aboutPage.findUnique({
      where: { id: 'about_page' },
      include: {
        values: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedPage,
    });
  } catch (error) {
    console.error('Failed to update about page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update about page content' },
      { status: 500 }
    );
  }
}
