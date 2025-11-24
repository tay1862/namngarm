const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Updating Green Aventurine Crystal...');

    try {
        const product = await prisma.product.update({
            where: { slug: 'green-aventurine-crystal' },
            data: {
                benefits_en: ["Promotes prosperity and good luck", "Enhances creativity and motivation", "Balances the Heart Chakra"],
                benefits_th: ["ส่งเสริมความมั่งคั่งและโชคลาภ", "เพิ่มความคิดสร้างสรรค์และแรงบันดาลใจ", "สมดุลจักระหัวใจ"],
                benefits_lo: ["ສົ່ງເສີມຄວາມຮັ່ງມີແລະໂຊກລາບ", "ເພີ່ມຄວາມຄິດສ້າງສັນແລະແຮງບັນດານໃຈ", "ສົມດຸນຈັກກະຫົວໃຈ"],
                benefits_zh: ["促进繁荣和好运", "增强创造力和动力", "平衡心轮"],
                howToUse_en: ["Place in your workspace or office", "Meditate with the crystal", "Carry in your pocket for luck"],
                howToUse_th: ["วางไว้ในที่ทำงานหรือออฟฟิศ", "ทำสมาธิกับคริสตัล", "พกติดตัวเพื่อโชคลาภ"],
                howToUse_lo: ["ວາງໄວ້ໃນບ່ອນເຮັດວຽກ", "ນັ່ງສະມາທິກຳກັບຫີນ", "ພົກຕິດໂຕເພື່ອໂຊກລາບ"],
                howToUse_zh: ["放置在工作区或办公室", "与水晶一起冥想", "随身携带以求好运"],
            },
        });

        console.log('Updated product:', product.name_en);
        console.log('Benefits EN:', product.benefits_en);
    } catch (error) {
        console.error('Error updating product:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
