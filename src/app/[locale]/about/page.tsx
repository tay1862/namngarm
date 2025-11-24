import { getTranslations } from 'next-intl/server';
import AboutContent from '@/components/AboutContent';

import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: AboutPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
    description: t('story.p1'),
  };
}

export default async function AboutPage({ params: { locale } }: AboutPageProps) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <AboutContent locale={locale} />
  );
}
