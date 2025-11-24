'use client';

import Script from 'next/script';

export default function GoogleAnalytics({ gaId }: { gaId?: string }) {
  const GA_ID = gaId || process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_ID) {
    // Only warn in development to avoid cluttering production logs
    if (process.env.NODE_ENV === 'development') {
      console.warn('Google Analytics ID not found');
    }
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}