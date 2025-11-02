import { getTranslations } from 'next-intl/server';
import AboutContent from '@/components/AboutContent';

export const dynamic = 'force-dynamic';

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export default async function AboutPage({ params: { locale } }: AboutPageProps) {
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return (
    <div className="min-h-screen">
      <section className="section-padding bg-gradient-to-br from-pink-50 via-white to-pink-50">
        <div className="container-custom">
          <AboutContent locale={locale} />
        </div>
      </section>
    </div>
  );
}
