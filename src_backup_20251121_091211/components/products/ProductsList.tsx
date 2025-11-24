'use client';

import { useTranslations } from 'next-intl';
import { getLocalizedField } from '@/lib/i18n-helpers';
import { Locale } from '@/i18n';
import { ProductStructuredData } from '@/components/seo/StructuredData';
import PremiumProductCard from '@/components/product/PremiumProductCard';

interface ProductsListProps {
  products: any[];
  locale: string;
}

export default function ProductsList({ products, locale }: ProductsListProps) {
  const t = useTranslations();

  if (products.length === 0) {
    return (
      <div className="text-center py-32">
        <div className="text-8xl mb-6">🛍️</div>
        <h3 className="text-3xl font-heading font-bold mb-4">{t('product.noProducts')}</h3>
        <p className="text-gray-600 dark:text-gray-400">Check back soon for new products!</p>
      </div>
    );
  }

  return (
    <>
      {products.map((product: any) => {
        const name = getLocalizedField(product, 'name', locale as Locale);
        const description = getLocalizedField(product, 'description', locale as Locale) ||
          getLocalizedField(product, 'excerpt', locale as Locale);

        return (
          <ProductStructuredData
            key={`structured-${product.id}`}
            product={{
              ...product,
              name,
              description,
            }}
            locale={locale}
          />
        );
      })}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        {products.map((product: any) => (
          <PremiumProductCard
            key={product.id}
            product={product}
            onQuickView={() => {
              // TODO: Implement quick view modal
              console.log('Quick view:', product);
            }}
            onAddToCart={() => {
              // WhatsApp contact
              const name = getLocalizedField(product, 'name', locale as Locale);
              const whatsappUrl = `https://wa.me/8562012345678?text=${t('product.whatsappMessage')}: ${name}`;
              window.open(whatsappUrl, '_blank');
            }}
          />
        ))}
      </div>
    </>
  );
}
