const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌟 Starting comprehensive database seeding...\n');

    try {
        // 1. Get or create admin user
        let admin = await prisma.user.findFirst({
            where: { role: 'SUPER_ADMIN' },
        });

        if (!admin) {
            console.log('⚠️  No admin user found. Creating one...');
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash('namngam123', 10);

            admin = await prisma.user.create({
                data: {
                    email: 'namngam@gmail.com',
                    name: 'NAMNGAM Admin',
                    password: hashedPassword,
                    role: 'SUPER_ADMIN',
                },
            });
            console.log(`✅ Created admin user: ${admin.email}\n`);
        } else {
            console.log(`✅ Found admin user: ${admin.email}\n`);
        }

        // 2. Clear existing data
        console.log('🗑️  Clearing existing data...');
        await prisma.article.deleteMany({});
        await prisma.product.deleteMany({});
        await prisma.category.deleteMany({});
        console.log('✅ Cleared all products, articles, and categories\n');

        // 3. Create Categories
        console.log('📁 Creating categories...');

        const crystalCategory = await prisma.category.create({
            data: {
                slug: 'healing-crystals',
                name_lo: 'ແກ້ວປິ່ນປົວ',
                name_en: 'Healing Crystals',
                description_lo: 'ແກ້ວທຳມະຊາດທີ່ມີພະລັງງານປິ່ນປົວ ແລະ ສ້າງຄວາມສົມດຸນໃຫ້ກັບຮ່າງກາຍ ແລະ ຈິດໃຈ',
                description_en: 'Natural crystals with healing energy that balance body and mind',
                isActive: true,
                order: 1,
            },
        });

        const toolsCategory = await prisma.category.create({
            data: {
                slug: 'beauty-wellness-tools',
                name_lo: 'ເຄື່ອງມືຄວາມງາມ ແລະ ສຸຂະພາບ',
                name_en: 'Beauty & Wellness Tools',
                description_lo: 'ເຄື່ອງມືທີ່ຊ່ວຍເພີ່ມຄວາມງາມ ແລະ ສຸຂະພາບຂອງຜິວ',
                description_en: 'Tools that enhance beauty and skin health',
                isActive: true,
                order: 2,
            },
        });

        console.log(`  ✅ Created category: ${crystalCategory.name_en}`);
        console.log(`  ✅ Created category: ${toolsCategory.name_en}\n`);

        // 4. Create Products
        console.log('🛍️  Creating products...\n');

        const products = [
            {
                slug: 'green-aventurine-crystal',
                name_lo: 'ແກ້ວກຣີນອາເວັນຈູຣີນ',
                name_en: 'Green Aventurine Crystal',
                description_lo: 'ແກ້ວກຣີນອາເວັນຈູຣີນເປັນທີ່ຮູ້ຈັກໃນການດຶງດູດໂຊກ ແລະ ຄວາມຮັ່ງມີ. ຫີນຊະນິດນີ້ສົ່ງເສີມຄວາມໝັ້ນໃຈ ແລະ ທັດສະນະຄະຕິທີ່ດີ, ຊຸກຍູ້ໃຫ້ທ່ານຮັບເອົາການປ່ຽນແປງ ແລະ ຈັບໂອກາດໃໝ່ໆ. ພະລັງງານທີ່ສະຫງົບຂອງມັນສົ່ງເສີມການປິ່ນປົວທາງດ້ານອາລົມ ແລະ ຊ່ວຍໃຫ້ທ່ານເຊື່ອມຕໍ່ກັບຄວາມປາຖະໜາຂອງຫົວໃຈ.',
                description_en: 'Green Aventurine is known for attracting luck and abundance. This stone promotes confidence and a positive outlook, encouraging you to embrace change and take on new opportunities. Its soothing energy fosters emotional healing and helps you to connect with your heart\'s desires.',
                price: 250000,
                currency: 'LAK',
                sku: 'GA-001',
                categoryId: crystalCategory.id,
                metaTitle_lo: 'ແກ້ວກຣີນອາເວັນຈູຣີນ - ດຶງດູດໂຊກ ແລະ ຄວາມຮັ່ງມີ',
                metaTitle_en: 'Green Aventurine - Attract Luck & Abundance',
                metaDesc_lo: 'ແກ້ວກຣີນອາເວັນຈູຣີນທີ່ມີພະລັງງານປິ່ນປົວ ດຶງດູດໂຊກ ແລະ ຄວາມຮັ່ງມີ ສົ່ງເສີມຄວາມໝັ້ນໃຈ',
                metaDesc_en: 'Green Aventurine with healing energy, attracts luck and abundance, promotes confidence',
                isPublished: true,
                isFeatured: true,
                order: 1,
            },
            {
                slug: 'rose-quartz-crystal',
                name_lo: 'ແກ້ວໂຣສຄວອດ',
                name_en: 'Rose Quartz Crystal',
                description_lo: 'ແກ້ວໂຣສຄວອດເປັນຫີນແຫ່ງຄວາມຮັກທີ່ບໍ່ມີເງື່ອນໄຂ ແລະ ການປິ່ນປົວທາງດ້ານອາລົມ. ມັນສົ່ງເສີມຄວາມສະຫງົບ, ຄວາມອ່ອນໂຍນ, ແລະ ຄວາມເມດຕາ. ເຊື່ອມຕໍ່ກັບຈັກກະຫົວໃຈ, ມັນຊ່ວຍເປີດໃຈຂອງທ່ານຕໍ່ຄວາມຮັກ ແລະ ຄວາມເຫັນອົກເຫັນໃຈ. ໂຣສຄວອດຍັງຊ່ວຍປິ່ນປົວບາດແຜທາງດ້ານອາລົມ ແລະ ສົ່ງເສີມຄວາມຮັກຕົນເອງ.',
                description_en: 'Rose Quartz is the stone of unconditional love and emotional healing. It promotes peace, gentleness, and compassion. Connected to the Heart Chakra, it helps open your heart to love and empathy. Rose Quartz also aids in healing emotional wounds and fostering self-love.',
                price: 180000,
                currency: 'LAK',
                sku: 'RQ-001',
                categoryId: crystalCategory.id,
                metaTitle_lo: 'ແກ້ວໂຣສຄວອດ - ຄວາມຮັກ ແລະ ການປິ່ນປົວ',
                metaTitle_en: 'Rose Quartz - Love & Healing',
                metaDesc_lo: 'ແກ້ວໂຣສຄວອດສົ່ງເສີມຄວາມຮັກທີ່ບໍ່ມີເງື່ອນໄຂ ການປິ່ນປົວທາງດ້ານອາລົມ ແລະ ຄວາມສະຫງົບ',
                metaDesc_en: 'Rose Quartz promotes unconditional love, emotional healing, and peace',
                isPublished: true,
                isFeatured: true,
                order: 2,
            },
            {
                slug: 'green-aventurine-gua-sha',
                name_lo: 'ກົວຊາແກ້ວກຣີນອາເວັນຈູຣີນ',
                name_en: 'Green Aventurine Gua Sha',
                description_lo: 'ກົວຊາແກ້ວກຣີນອາເວັນຈູຣີນເປັນເຄື່ອງມືຄວາມງາມທີ່ຫຼຸດຜ່ອນຄວາມຕຶງຂອງກ້າມເນື້ອໃບໜ້າ, ປັບປຸງການໄຫຼວຽນຂອງເລືອດ, ແລະ ສົ່ງເສີມການລະບາຍນ້ຳເຫຼືອງ. ການນວດດ້ວຍກົວຊາເປັນປະຈຳຊ່ວຍຫຼຸດຜ່ອນອາການບວມ, ເພີ່ມຄວາມງາມຂອງຜິວ, ແລະ ສ້າງຄວາມຮູ້ສຶກຜ່ອນຄາຍ. ພະລັງງານຂອງກຣີນອາເວັນຈູຣີນຍັງດຶງດູດໂຊກ ແລະ ຄວາມຮັ່ງມີ.',
                description_en: 'Green Aventurine Gua Sha is a beauty tool that reduces facial muscle tension, improves blood circulation, and promotes lymphatic drainage. Regular gua sha massage helps reduce puffiness, enhance skin radiance, and create a sense of relaxation. The energy of Green Aventurine also attracts luck and abundance.',
                price: 320000,
                currency: 'LAK',
                sku: 'GA-GS-001',
                categoryId: toolsCategory.id,
                metaTitle_lo: 'ກົວຊາແກ້ວກຣີນອາເວັນຈູຣີນ - ເຄື່ອງມືຄວາມງາມ',
                metaTitle_en: 'Green Aventurine Gua Sha - Beauty Tool',
                metaDesc_lo: 'ກົວຊາແກ້ວກຣີນອາເວັນຈູຣີນຫຼຸດຜ່ອນອາການບວມ ປັບປຸງການໄຫຼວຽນ ແລະ ດຶງດູດໂຊກ',
                metaDesc_en: 'Green Aventurine Gua Sha reduces puffiness, improves circulation, attracts luck',
                isPublished: true,
                isFeatured: true,
                order: 3,
            },
            {
                slug: 'rose-quartz-gua-sha',
                name_lo: 'ກົວຊາແກ້ວໂຣສຄວອດ',
                name_en: 'Rose Quartz Gua Sha',
                description_lo: 'ກົວຊາແກ້ວໂຣສຄວອດລວມເອົາຄຸນປະໂຫຍດຂອງການນວດແບບດັ້ງເດີມເຂົ້າກັບພະລັງງານຂອງຄວາມຮັກ ແລະ ການປິ່ນປົວ. ມັນຊ່ວຍຫຼຸດຜ່ອນຄວາມຕຶງ, ປັບປຸງຄວາມຍືດຫຍຸ່ນຂອງຜິວ, ແລະ ສົ່ງເສີມຄວາມເປັ່ງປະກາຍຈາກພາຍໃນ. ການນວດດ້ວຍກົວຊາໂຣສຄວອດເປັນປະຈຳຊ່ວຍສ້າງຄວາມສະຫງົບ, ຫຼຸດຜ່ອນຄວາມກັງວົນ, ແລະ ສົ່ງເສີມການປິ່ນປົວທາງດ້ານອາລົມ.',
                description_en: 'Rose Quartz Gua Sha combines the benefits of traditional massage with the energy of love and healing. It helps reduce tension, improve skin elasticity, and promote radiance from within. Regular rose quartz gua sha massage helps create calmness, reduce anxiety, and foster emotional healing.',
                price: 290000,
                currency: 'LAK',
                sku: 'RQ-GS-001',
                categoryId: toolsCategory.id,
                metaTitle_lo: 'ກົວຊາແກ້ວໂຣສຄວອດ - ຄວາມຮັກ ແລະ ຄວາມງາມ',
                metaTitle_en: 'Rose Quartz Gua Sha - Love & Beauty',
                metaDesc_lo: 'ກົວຊາແກ້ວໂຣສຄວອດສົ່ງເສີມຄວາມງາມ ການປິ່ນປົວທາງດ້ານອາລົມ ແລະ ຄວາມສະຫງົບ',
                metaDesc_en: 'Rose Quartz Gua Sha promotes beauty, emotional healing, and calmness',
                isPublished: true,
                isFeatured: true,
                order: 4,
            },
        ];

        for (const product of products) {
            await prisma.product.create({
                data: {
                    ...product,
                    createdById: admin.id,
                    publishedAt: new Date(),
                },
            });
            console.log(`  ✅ Created product: ${product.name_en}`);
        }

        // 5. Create Articles
        console.log('\n📝 Creating articles...\n');

        const articles = [
            {
                slug: 'green-aventurine-prosperity-guide',
                title_lo: 'ຄູ່ມືການໃຊ້ແກ້ວກຣີນອາເວັນຈູຣີນເພື່ອຄວາມຮັ່ງມີ',
                title_en: 'Green Aventurine Prosperity Guide',
                excerpt_lo: 'ຄົ້ນພົບວິທີການໃຊ້ແກ້ວກຣີນອາເວັນຈູຣີນເພື່ອດຶງດູດໂຊກ, ຄວາມຮັ່ງມີ, ແລະ ໂອກາດໃໝ່ໆ ເຂົ້າມາໃນຊີວິດຂອງທ່ານ',
                excerpt_en: 'Discover how to use Green Aventurine to attract luck, abundance, and new opportunities into your life',
                content_lo: `# ແກ້ວກຣີນອາເວັນຈູຣີນ: ຫີນແຫ່ງໂຊກ ແລະ ຄວາມຮັ່ງມີ

ແກ້ວກຣີນອາເວັນຈູຣີນເປັນຫີນທີ່ມີພະລັງງານສູງທີ່ຮູ້ຈັກກັນດີໃນການດຶງດູດໂຊກ ແລະ ຄວາມຮັ່ງມີ. ຫີນສີຂຽວທີ່ສວຍງາມນີ້ບໍ່ພຽງແຕ່ຊ່ວຍດ້ານການເງິນເທົ່ານັ້ນ, ແຕ່ຍັງສົ່ງເສີມຄວາມໝັ້ນໃຈ ແລະ ທັດສະນະຄະຕິທີ່ດີອີກດ້ວຍ.

## ຄຸນສົມບັດຂອງແກ້ວກຣີນອາເວັນຈູຣີນ

- **ດຶງດູດໂຊກ ແລະ ຄວາມຮັ່ງມີ**: ຊ່ວຍເປີດປະຕູສູ່ໂອກາດໃໝ່ໆ
- **ສົ່ງເສີມຄວາມໝັ້ນໃຈ**: ເພີ່ມຄວາມເຊື່ອໝັ້ນໃນຕົວເອງ
- **ປິ່ນປົວທາງດ້ານອາລົມ**: ຊ່ວຍສະຫງົບຈິດໃຈ
- **ເຊື່ອມຕໍ່ກັບຫົວໃຈ**: ຊ່ວຍໃຫ້ທ່ານຕິດຕາມຄວາມປາຖະໜາຂອງຫົວໃຈ

## ວິທີການໃຊ້

1. **ພົກພາໃສ່ຕົວ**: ເກັບໄວ້ໃນກະເປົາຫຼືກະເປົາເງິນ
2. **ນັ່ງສະມາທິ**: ຖືແກ້ວໃນມືໃນຂະນະທີ່ນັ່ງສະມາທິ
3. **ວາງໃນບ້ານ**: ວາງໄວ້ໃນບ່ອນເຮັດວຽກຫຼືບ່ອນພັກຜ່ອນ

ແກ້ວກຣີນອາເວັນຈູຣີນແມ່ນເພື່ອນທີ່ດີສຳລັບຜູ້ທີ່ຕ້ອງການເພີ່ມໂຊກ ແລະ ຄວາມຮັ່ງມີໃນຊີວິດ!`,
                content_en: `# Green Aventurine: Stone of Luck and Prosperity

Green Aventurine is a high-energy stone well known for attracting luck and abundance. This beautiful green stone not only helps with finances but also promotes confidence and a positive attitude.

## Properties of Green Aventurine

- **Attracts Luck and Abundance**: Helps open doors to new opportunities
- **Promotes Confidence**: Boosts self-confidence
- **Emotional Healing**: Helps calm the mind
- **Connects with the Heart**: Helps you follow your heart's desires

## How to Use

1. **Carry with You**: Keep in your pocket or wallet
2. **Meditate**: Hold the crystal in your hand while meditating
3. **Place at Home**: Put in your workspace or resting area

Green Aventurine is a great companion for those who want to increase luck and prosperity in life!`,
                metaTitle_lo: 'ຄູ່ມືແກ້ວກຣີນອາເວັນຈູຣີນ - ໂຊກ ແລະ ຄວາມຮັ່ງມີ',
                metaTitle_en: 'Green Aventurine Guide - Luck & Prosperity',
                metaDesc_lo: 'ຄົ້ນພົບວິທີການໃຊ້ແກ້ວກຣີນອາເວັນຈູຣີນເພື່ອດຶງດູດໂຊກ ຄວາມຮັ່ງມີ ແລະ ໂອກາດໃໝ່',
                metaDesc_en: 'Discover how to use Green Aventurine to attract luck, abundance, and new opportunities',
                isPublished: true,
                isFeatured: true,
            },
            {
                slug: 'rose-quartz-love-healing',
                title_lo: 'ແກ້ວໂຣສຄວອດ: ຄວາມຮັກ ແລະ ການປິ່ນປົວ',
                title_en: 'Rose Quartz: Love and Healing',
                excerpt_lo: 'ຮຽນຮູ້ກ່ຽວກັບພະລັງງານຂອງຄວາມຮັກ ແລະ ການປິ່ນປົວຂອງແກ້ວໂຣສຄວອດ ແລະ ວິທີການນຳມັນມາໃຊ້ໃນຊີວິດປະຈຳວັນ',
                excerpt_en: 'Learn about the loving and healing energy of Rose Quartz and how to use it in daily life',
                content_lo: `# ແກ້ວໂຣສຄວອດ: ຫີນແຫ່ງຄວາມຮັກທີ່ບໍ່ມີເງື່ອນໄຂ

ແກ້ວໂຣສຄວອດເປັນຫີນທີ່ມີພະລັງງານອ່ອນໂຍນ ແລະ ເຕັມໄປດ້ວຍຄວາມຮັກ. ມັນເປັນຫີນທີ່ດີທີ່ສຸດສຳລັບການປິ່ນປົວທາງດ້ານອາລົມ ແລະ ການເປີດໃຈຕໍ່ຄວາມຮັກ.

## ຄຸນປະໂຫຍດຂອງແກ້ວໂຣສຄວອດ

- **ຄວາມຮັກທີ່ບໍ່ມີເງື່ອນໄຂ**: ສົ່ງເສີມຄວາມຮັກຕົນເອງ ແລະ ຄວາມຮັກຕໍ່ຜູ້ອື່ນ
- **ການປິ່ນປົວທາງດ້ານອາລົມ**: ຊ່ວຍປິ່ນປົວບາດແຜທາງດ້ານອາລົມ
- **ຄວາມສະຫງົບ**: ສ້າງຄວາມສະຫງົບ ແລະ ຄວາມອ່ອນໂຍນ
- **ຈັກກະຫົວໃຈ**: ເຊື່ອມຕໍ່ກັບຈັກກະຫົວໃຈ

## ວິທີການໃຊ້ແກ້ວໂຣສຄວອດ

1. **ນັ່ງສະມາທິ**: ຖືແກ້ວໃກ້ກັບຫົວໃຈ
2. **ວາງໃນຫ້ອງນອນ**: ສ້າງບັນຍາກາດຂອງຄວາມຮັກ
3. **ອາບນ້ຳ**: ເພີ່ມແກ້ວໃນນ້ຳອາບ (ໃຊ້ວິທີທາງອ້ອມ)

ແກ້ວໂຣສຄວອດແມ່ນເພື່ອນທີ່ດີສຳລັບທຸກຄົນທີ່ຕ້ອງການເພີ່ມຄວາມຮັກ ແລະ ຄວາມສະຫງົບໃນຊີວິດ!`,
                content_en: `# Rose Quartz: Stone of Unconditional Love

Rose Quartz is a stone with gentle energy and full of love. It is the best stone for emotional healing and opening the heart to love.

## Benefits of Rose Quartz

- **Unconditional Love**: Promotes self-love and love for others
- **Emotional Healing**: Helps heal emotional wounds
- **Peace**: Creates calmness and gentleness
- **Heart Chakra**: Connects with the heart chakra

## How to Use Rose Quartz

1. **Meditate**: Hold the crystal near your heart
2. **Place in Bedroom**: Create an atmosphere of love
3. **Bath**: Add crystal to bath water (use indirect method)

Rose Quartz is a great companion for everyone who wants to increase love and peace in life!`,
                metaTitle_lo: 'ແກ້ວໂຣສຄວອດ - ຄວາມຮັກ ແລະ ການປິ່ນປົວ',
                metaTitle_en: 'Rose Quartz - Love and Healing',
                metaDesc_lo: 'ຮຽນຮູ້ກ່ຽວກັບພະລັງງານຂອງຄວາມຮັກ ແລະ ການປິ່ນປົວຂອງແກ້ວໂຣສຄວອດ',
                metaDesc_en: 'Learn about the loving and healing energy of Rose Quartz',
                isPublished: true,
                isFeatured: true,
            },
            {
                slug: 'gua-sha-facial-massage-guide',
                title_lo: 'ຄູ່ມືການນວດໃບໜ້າດ້ວຍກົວຊາ',
                title_en: 'Gua Sha Facial Massage Guide',
                excerpt_lo: 'ຮຽນຮູ້ເຕັກນິກການນວດໃບໜ້າດ້ວຍກົວຊາເພື່ອຜິວທີ່ງາມ ແລະ ສຸຂະພາບດີ',
                excerpt_en: 'Learn gua sha facial massage techniques for beautiful and healthy skin',
                content_lo: `# ການນວດໃບໜ້າດ້ວຍກົວຊາ: ເຕັກນິກບູຮານສຳລັບຄວາມງາມທີ່ທັນສະໄໝ

ກົວຊາແມ່ນເຕັກນິກການນວດແບບດັ້ງເດີມຂອງຈີນທີ່ໄດ້ຮັບຄວາມນິຍົມໃນການດູແລຜິວທີ່ທັນສະໄໝ. ການນວດດ້ວຍກົວຊາເປັນປະຈຳຊ່ວຍປັບປຸງການໄຫຼວຽນຂອງເລືອດ, ຫຼຸດຜ່ອນອາການບວມ, ແລະ ສົ່ງເສີມຄວາມງາມຂອງຜິວ.

## ປະໂຫຍດຂອງກົວຊາ

- **ປັບປຸງການໄຫຼວຽນ**: ເພີ່ມການໄຫຼວຽນຂອງເລືອດ
- **ລະບາຍນ້ຳເຫຼືອງ**: ຊ່ວຍລະບາຍນ້ຳເຫຼືອງ
- **ຫຼຸດຜ່ອນອາການບວມ**: ລົບອາການບວມໃບໜ້າ
- **ເພີ່ມຄວາມງາມ**: ສ້າງຄວາມເປັ່ງປະກາຍຈາກພາຍໃນ

## ວິທີການນວດດ້ວຍກົວຊາ

1. **ທຳຄວາມສະອາດໃບໜ້າ**: ລ້າງໃບໜ້າໃຫ້ສະອາດ
2. **ທາເຊຣຸ່ມຫຼືນ້ຳມັນ**: ເພື່ອໃຫ້ກົວຊາເລື່ອນງ່າຍ
3. **ນວດຈາກກາງໄປຂ້າງນອກ**: ນວດດ້ວຍຄວາມກົດດັນທີ່ອ່ອນໂຍນ
4. **ເຮັດເປັນປະຈຳ**: ນວດ 3-5 ນາທີ ທຸກວັນ

ການນວດດ້ວຍກົວຊາເປັນປະຈຳຈະຊ່ວຍໃຫ້ຜິວຂອງທ່ານງາມ ແລະ ມີສຸຂະພາບດີ!`,
                content_en: `# Gua Sha Facial Massage: Ancient Technique for Modern Beauty

Gua sha is a traditional Chinese massage technique that has become popular in modern skincare. Regular gua sha massage helps improve blood circulation, reduce puffiness, and promote skin beauty.

## Benefits of Gua Sha

- **Improves Circulation**: Increases blood flow
- **Lymphatic Drainage**: Helps drain lymph
- **Reduces Puffiness**: Eliminates facial swelling
- **Enhances Beauty**: Creates radiance from within

## How to Use Gua Sha

1. **Cleanse Face**: Wash face thoroughly
2. **Apply Serum or Oil**: To help gua sha glide easily
3. **Massage from Center Outward**: Massage with gentle pressure
4. **Do Regularly**: Massage 3-5 minutes daily

Regular gua sha massage will help your skin look beautiful and healthy!`,
                metaTitle_lo: 'ຄູ່ມືການນວດກົວຊາ - ຄວາມງາມແລະສຸຂະພາບ',
                metaTitle_en: 'Gua Sha Massage Guide - Beauty & Health',
                metaDesc_lo: 'ຮຽນຮູ້ເຕັກນິກການນວດກົວຊາເພື່ອຜິວທີ່ງາມແລະສຸຂະພາບດີ',
                metaDesc_en: 'Learn gua sha massage techniques for beautiful and healthy skin',
                isPublished: true,
                isFeatured: true,
            },
        ];

        for (const article of articles) {
            await prisma.article.create({
                data: {
                    ...article,
                    createdById: admin.id,
                    publishedAt: new Date(),
                },
            });
            console.log(`  ✅ Created article: ${article.title_en}`);
        }

        console.log('\n🎉 Database seeding completed successfully!\n');
        console.log('📊 Summary:');
        console.log(`   - Categories: 2`);
        console.log(`   - Products: ${products.length}`);
        console.log(`   - Articles: ${articles.length}`);
        console.log('\n✨ You can now view your data at:');
        console.log('   - Products: http://localhost:3000/products');
        console.log('   - Articles: http://localhost:3000/articles');
        console.log('   - Admin: http://localhost:3000/admin\n');

    } catch (error) {
        console.error('\n❌ Error seeding database:', error);
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
