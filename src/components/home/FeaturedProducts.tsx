'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Locale } from '@/i18n';
import { getLocalizedField } from '@/lib/i18n-helpers';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PremiumProductCard from '@/components/product/PremiumProductCard';

export default function FeaturedProducts() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products?featured=true&published=true&limit=3');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [t]);

  return (
    <section className="section-padding bg-gradient-to-br from-white via-pink-25/30 to-white relative overflow-hidden">
      {/* Subtle background elements for visual continuity */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-pink-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-pink-150/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              {t('product.featured')}
            </h2>
            <p className="text-gray-600 text-lg">{t('product.latest')}</p>
          </div>
          <Link
            href={`/${locale}/products`}
            className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium group"
          >
            {t('common.viewAll')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="aspect-square rounded-xl bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('product.noFeaturedProducts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <PremiumProductCard
                key={product.id}
                product={product}
                onAddToCart={() => {
                  const name = getLocalizedField(product, 'name', locale);
                  const whatsappUrl = `https://wa.me/8562012345678?text=${t('product.whatsappMessage')}: ${name}`;
                  window.open(whatsappUrl, '_blank');
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
