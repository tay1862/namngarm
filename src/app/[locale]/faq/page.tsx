import FAQsClient from './FAQsClient';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

interface FAQPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: FAQPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'faq' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function FAQPage() {
  return <FAQsClient />;
}
