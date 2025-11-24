import { getTranslations } from 'next-intl/server';
import ProductsList from '@/components/products/ProductsList';
import { PremiumLoading } from '@/components/shared/PremiumLoading';
import DynamicBackground from '@/components/shared/DynamicBackground';
import { PageStructuredData } from '@/components/seo/StructuredData';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products?published=true`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error('API response not ok:', res.status, res.statusText);
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Products API response:', data);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'product' });
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: `${t('allProducts')} | NAMNGAM`,
    description: t('description'),
    openGraph: {
      title: t('allProducts'),
      description: t('description'),
      url: `${baseUrl}/${params.locale}/products`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('allProducts'),
      description: t('description'),
    },
  };
}

export default async function ProductsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'product' });

  const breadcrumbs = [
    { name: t('nav.home'), url: `/${params.locale}` },
    { name: t('allProducts'), url: `/${params.locale}/products` },
  ];

  const products = await getProducts();

  return (
    <>
      {/* Structured Data */}
      <PageStructuredData
        title={t('allProducts')}
        description={t('description')}
        breadcrumbs={breadcrumbs}
        locale={params.locale}
      />

      <div className="min-h-screen">
        <DynamicBackground type="productsBg" fallbackClass="soft-gradient-bg">
          <section className="section-padding">
            <div className="container-custom">
              {/* Eyebrow Text */}
              <p className="eyebrow text-center mb-8">
                Our Collection
              </p>

              {/* Main Heading */}
              <h1 className="text-center mb-6">
                {t('allProducts')}
              </h1>

              {/* Description */}
              <p className="lead text-center mb-20 max-w-3xl mx-auto">
                {t('description')}
              </p>

              {products.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-6">🛍️</div>
                  <h3 className="text-2xl font-heading font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('noProducts')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    {t('noFeaturedProducts')}
                  </p>
                </div>
              ) : (
                <ProductsList products={products} locale={params.locale} />
              )}
            </div>
          </section>
        </DynamicBackground>
      </div>
    </>
  );
}

