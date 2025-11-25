import { getTranslations } from 'next-intl/server';
import PremiumHero from '@/components/home/PremiumHero';
import TrustSignals from '@/components/home/TrustSignals';
import HeroAboutTransition from '@/components/home/HeroAboutTransition';
import AboutContent from '@/components/AboutContent';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import LatestArticles from '@/components/home/LatestArticles';
import FAQSection from '@/components/home/FAQSection';
import { prisma } from '@/lib/prisma';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const t = await getTranslations('home');

  // Fetch settings from database
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'site_settings' }
  });

  // Get localized content
  const locale = params.locale as 'lo' | 'en' | 'th' | 'zh';
  const heroTitle = (settings as any)?.[`heroTitle_${locale}`] || t('hero.title');
  const heroSubtitle = (settings as any)?.[`heroSubtitle_${locale}`] || t('hero.subtitle');
  const heroWelcome = (settings as any)?.[`heroWelcome_${locale}`] || t('hero.welcome');
  const homeBg = settings?.homeBg || undefined;
  const heroDesignImage = settings?.heroDesignImage || undefined;

  return (
    <div className="overflow-hidden">
      <PremiumHero
        title={heroTitle}
        subtitle={heroSubtitle}
        description={''} // Description is not in settings, maybe remove or use subtitle
        eyebrow={heroWelcome}
        primaryCTA={{
          label: t('hero.cta.primary'),
          href: `/${params.locale}/products`
        }}
        secondaryCTA={{
          label: t('hero.cta.secondary'),
          href: `/${params.locale}/about`
        }}
        backgroundImage={homeBg}
        heroDesignImage={heroDesignImage}
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
