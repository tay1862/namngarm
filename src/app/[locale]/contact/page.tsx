import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const dynamic = 'force-dynamic';

interface ContactPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: ContactPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('getInTouch'),
    description: t('description'),
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
