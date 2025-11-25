import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { Metadata } from 'next';

// Force rebuild
interface Props {
    params: {
        locale: string;
        slug: string;
    };
}

async function getProduct(slug: string) {
    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            images: {
                orderBy: { order: 'asc' }
            }
        }
    });

    if (!product) return null;
    return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct(params.slug);
    if (!product) return {};

    const locale = params.locale as 'lo' | 'th' | 'zh' | 'en';
    const title = (product as any)[`metaTitle_${locale}`] || (product as any)[`name_${locale}`] || product.name_en;
    const description = (product as any)[`metaDesc_${locale}`] || (product as any)[`description_${locale}`] || product.description_en;

    return {
        title: `${title} | NAMNGAM`,
        description,
        openGraph: {
            title,
            description,
            images: product.featuredImage ? [product.featuredImage] : []
        }
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const product = await getProduct(params.slug);

    if (!product) {
        notFound();
    }

    const t = await getTranslations({ locale: params.locale, namespace: 'product' });
    const common = await getTranslations({ locale: params.locale, namespace: 'common' });

    const translations = {
        addToCart: t('addToCart'),
        buyNow: t('buyNow'),
        description: t('description'),
        benefits: t('benefits') || 'Benefits', // Fallback if key missing
        howToUse: t('howToUse') || 'How to Use', // Fallback if key missing
        share: t('share') || 'Share',
        sku: t('sku'),
        interested: t('interested')
    };

    return (
        <ProductDetailClient
            product={{
                ...product,
                price: product.price ? Number(product.price) : null,
                benefits_lo: Array.isArray(product.benefits_lo) ? product.benefits_lo as string[] : undefined,
                benefits_en: Array.isArray(product.benefits_en) ? product.benefits_en as string[] : undefined,
                howToUse_lo: Array.isArray(product.howToUse_lo) ? product.howToUse_lo as string[] : undefined,
                howToUse_en: Array.isArray(product.howToUse_en) ? product.howToUse_en as string[] : undefined
            }}
            translations={translations}
        />
    );
}
