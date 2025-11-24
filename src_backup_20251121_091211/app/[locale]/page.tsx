'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PremiumHero from '@/components/home/PremiumHero';
import TrustSignals from '@/components/home/TrustSignals';
import HeroAboutTransition from '@/components/home/HeroAboutTransition';
import AboutContent from '@/components/AboutContent';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import LatestArticles from '@/components/home/LatestArticles';
import FAQSection from '@/components/home/FAQSection';

export default function HomePage({ params }: { params: { locale: string } }) {
  const t = useTranslations('home');

  return (
    <div className="overflow-hidden">
      <PremiumHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
        eyebrow={t('hero.welcome')}
        primaryCTA={{
          label: t('hero.cta.primary'),
          href: `/${params.locale}/products`
        }}
        secondaryCTA={{
          label: t('hero.cta.secondary'),
          href: `/${params.locale}/about`
        }}
      />
      <TrustSignals />
      <HeroAboutTransition />
      <AboutContent locale={params.locale} />
      <FeaturedProducts />
      <LatestArticles />
      <FAQSection locale={params.locale} />
    </div>
  );
}
