import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../../styles/globals.css';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import FacebookPixel from '@/components/analytics/FacebookPixel';
import StructuredData, { OrganizationStructuredData } from '@/components/seo/StructuredData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdminLoginProvider from '@/components/layout/AdminLoginProvider';
import FloatingQuickLinks from '@/components/layout/QuickLinks';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'site_settings' }
  });

  const siteName = (settings?.[`siteName_${locale}` as keyof typeof settings] as string) || 'NAMNGAM';
  const description = (settings?.[`defaultMetaDesc_${locale}` as keyof typeof settings] as string) || 'Premium quality products and beauty items';

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: description,
    openGraph: {
      siteName: siteName,
      description: description,
      locale: locale === 'lo' ? 'lo_LA' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as any)) notFound();

  // Load messages using the proper next-intl server approach
  // This will automatically use the locale from the params
  const messages = await getMessages({ locale });

  // Fetch settings for analytics
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'site_settings' }
  });

  return (
    <html lang={locale}>
      <head>
        <GoogleAnalytics gaId={settings?.googleAnalyticsId || undefined} />
        <FacebookPixel pixelId={settings?.facebookPixelId || undefined} />
        <OrganizationStructuredData
          data={{
            name: (settings?.[`siteName_${locale}` as keyof typeof settings] as string) || 'NAMNGAM',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3001'}/${locale}`,
            logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3001'}/logo.png`,
            description: (settings?.[`defaultMetaDesc_${locale}` as keyof typeof settings] as string) || 'Premium quality products and beauty items',
            sameAs: [
              process.env.NEXT_PUBLIC_SITE_URL,
              settings?.facebookPage || '',
            ].filter(Boolean),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <AdminLoginProvider />

          {/* Floating Quick Links */}
          <FloatingQuickLinks />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
