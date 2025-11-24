import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET about page content
export async function GET() {
  try {
    console.log('GET request received for /api/about');

    const aboutPage = await prisma.aboutPage.findUnique({
      where: { id: 'about_page' },
      include: {
        values: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!aboutPage) {
      // Create default about page if not exists
      const defaultAboutPage = await prisma.aboutPage.create({
        data: {
          id: 'about_page',
          storyParagraph1_lo: 'NAMNGAM ORIGINAL ເປັນແບຣນທີ່ມຸ່ງໝັ້ນໃນການນຳສະເໜີສິນຄ້າທີ່ມີຄຸນນະພາບ ແລະ ການບໍລິການທີ່ດີທີ່ສຸດໃຫ້ກັບລູກຄ້າທຸກທ່ານ.',

          storyParagraph1_en: 'NAMNGAM ORIGINAL is a brand committed to presenting quality products and the best service to all our customers.',
          storyParagraph2_lo: 'ພວກເຮົາເຊື່ອວ່າ ຄຸນນະພາບແລະຄວາມງາມທີ່ແທ້ຈິງ ແມ່ນສິ່ງທີ່ທຸກຄົນສົມຄວນໄດ້ຮັບ.',

          storyParagraph2_en: 'We believe that true quality and beauty are what everyone deserves.',
          values: {
            create: [
              {
                icon: '💎',
                title_lo: 'ຄຸນນະພາບ',

                title_en: 'Quality',
                description_lo: 'ສິນຄ້າທຸກຊິ້ນຜ່ານການຄັດເລືອກຢ່າງພິຖີພິຖັນ',

                description_en: 'Every product is carefully selected',
                order: 0
              },
              {
                icon: '✨',
                title_lo: 'ຄວາມງາມ',

                title_en: 'Beauty',
                description_lo: 'ອອກແບບສວຍງາມ ທັນສະໄໝ',

                description_en: 'Beautiful design, modern style',
                order: 1
              },
              {
                icon: '🤝',
                title_lo: 'ບໍລິການ',

                title_en: 'Service',
                description_lo: 'ພ້ອມໃຫ້ຄຳປຶກສາ ດ້ວຍຄວາມເປັນມິດ',

                description_en: 'Ready to provide friendly consultation',
                order: 2
              }
            ]
          }
        },
        include: {
          values: {
            orderBy: { order: 'asc' }
          }
        }
      });

      return NextResponse.json({
        success: true,
        data: defaultAboutPage
      });
    }

    return NextResponse.json({
      success: true,
      data: aboutPage
    });
  } catch (error) {
    console.error('Failed to fetch about page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch about page content' },
      { status: 500 }
    );
  }
}

// POST - Update about page content
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('PUT request received for /api/about');

    const body = await request.json();

    // Log the received data for debugging
    console.log('Received about page update data:', JSON.stringify(body, null, 2));

    const {
      title_lo, title_en,
      storyTitle_lo, storyTitle_en,
      storyParagraph1_lo, storyParagraph1_en,
      storyParagraph2_lo, storyParagraph2_en,
      backgroundImage,
      founderImage, founderName_lo, founderName_en, founderQuote_lo, founderQuote_en,
      values
    } = body;

    // Update about page
    const aboutPage = await prisma.aboutPage.upsert({
      where: { id: 'about_page' },
      update: {
        title_lo, title_en,
        storyTitle_lo, storyTitle_en,
        storyParagraph1_lo, storyParagraph1_en,
        storyParagraph2_lo, storyParagraph2_en,
        backgroundImage,
        founderImage, founderName_lo, founderName_en, founderQuote_lo, founderQuote_en
      },
      create: {
        id: 'about_page',
        title_lo, title_en,
        storyTitle_lo, storyTitle_en,
        storyParagraph1_lo, storyParagraph1_en,
        storyParagraph2_lo, storyParagraph2_en,
        backgroundImage,
        founderImage, founderName_lo, founderName_en, founderQuote_lo, founderQuote_en
      }
    });

    // Handle values (company values/principles)
    if (values && Array.isArray(values)) {
      try {
        // Get existing values to determine what to delete
        const existingValues = await prisma.aboutValue.findMany({
          where: { aboutPageId: 'about_page' }
        });

        // Extract existing IDs
        const existingIds = existingValues.map(v => v.id);
        const incomingIds = values.filter(v => v.id).map(v => v.id);

        // Delete values that are not in the incoming data
        const idsToDelete = existingIds.filter(id => !incomingIds.includes(id));
        if (idsToDelete.length > 0) {
          await prisma.aboutValue.deleteMany({
            where: {
              id: { in: idsToDelete }
            }
          });
        }

        // Update or create values
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          const valueData = {
            icon: value.icon || '',
            title_lo: value.title_lo || '',

            title_en: value.title_en || '',
            description_lo: value.description_lo || null,

            description_en: value.description_en || null,
            order: i
          };

          if (value.id) {
            // Update existing value
            await prisma.aboutValue.update({
              where: { id: value.id },
              data: valueData
            });
          } else {
            // Create new value
            await prisma.aboutValue.create({
              data: {
                ...valueData,
                aboutPageId: 'about_page'
              }
            });
          }
        }
      } catch (error) {
        console.error('Error handling values:', error);
        throw new Error(`Failed to update about page values: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Fetch updated page with values
    const updatedPage = await prisma.aboutPage.findUnique({
      where: { id: 'about_page' },
      include: {
        values: {
          orderBy: { order: 'asc' }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedPage
    });
  } catch (error) {
    console.error('Failed to update about page:', error);
    return NextResponse.json(
      {
        success: false,
        error: `Failed to update about page content: ${error instanceof Error ? error.message : 'Unknown error'}`
      },
      { status: 500 }
    );
  }
}
