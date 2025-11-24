const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🔗 Creating Quick Links...\n');

    try {
        // Delete existing quick links
        await prisma.quickLink.deleteMany({});
        console.log('✅ Cleared existing quick links\n');

        const quickLinks = [
            {
                type: 'FACEBOOK',
                label_lo: 'Facebook',
                label_th: 'Facebook',
                label_zh: 'Facebook',
                label_en: 'Facebook',
                url: 'https://facebook.com/namngam',
                icon: 'Facebook',
                color: '#1877F2',
                order: 1,
                isActive: true,
            },
            {
                type: 'EMAIL',
                label_lo: 'Email',
                label_th: 'อีเมล',
                label_zh: '电子邮件',
                label_en: 'Email',
                url: 'mailto:namngam@gmail.com',
                icon: 'Mail',
                color: '#EA4335',
                order: 2,
                isActive: true,
            },
            {
                type: 'WHATSAPP',
                label_lo: 'WhatsApp',
                label_th: 'WhatsApp',
                label_zh: 'WhatsApp',
                label_en: 'WhatsApp',
                url: 'https://wa.me/8562012345678',
                icon: 'MessageCircle',
                color: '#25D366',
                order: 3,
                isActive: true,
            },
            {
                type: 'CUSTOM',
                label_lo: 'Shop',
                label_th: 'ร้านค้า',
                label_zh: '商店',
                label_en: 'Shop',
                url: '/products',
                icon: 'ShoppingBag',
                color: '#F875AA',
                order: 4,
                isActive: true,
            },
        ];

        for (const link of quickLinks) {
            await prisma.quickLink.create({
                data: link,
            });
            console.log(`  ✅ Created quick link: ${link.label_en}`);
        }

        console.log('\n🎉 Quick Links created successfully!\n');
        console.log('📊 Summary:');
        console.log(`   - Quick Links: ${quickLinks.length}\n`);

    } catch (error) {
        console.error('\n❌ Error creating quick links:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
