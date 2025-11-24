'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Mail, Phone } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { addCacheBusting } from '@/lib/performance';

// WhatsApp SVG Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// LINE SVG Icon
function LineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#00C300">
      <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.609-3.842 2.609-6.002zm-13.824 2.92v-4.332h-1.606v4.332h1.606zm5.723-2.726h-2.426v1.121h2.426v1.605h-4.031v-4.332h4.031v1.606zm-6.954 2.726h-1.605v-4.332h1.605v2.726l2.341-2.726h1.98l-2.558 2.881 2.636 1.451h-2.005l-1.442-1.812-.952 1.076v.736zm9.055 0h-1.605v-4.332h1.605v4.332z" />
    </svg>
  );
}

// Phone SVG Icon
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// Email SVG Icon
function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations();
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');
  const tFooter = useTranslations('footer');
  const tFaq = useTranslations('faq');
  const locale = useLocale();
  const { settings, loading } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-pink-50 via-pink-100 to-pink-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-700 dark:text-gray-200 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-300 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-rose-300 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container-custom py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <Image
                  src={settings?.logo ? addCacheBusting(settings.logo) : "/Logo_Namngam_FINAL-03.png"}
                  alt="NAMNGAM"
                  width={56}
                  height={56}
                  className="object-contain drop-shadow-md"
                />
              </div>
              <span className="text-lg font-heading font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
                {settings?.[`siteName_${locale}` as keyof typeof settings] || 'NAMNGAM'}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-pink-600 dark:text-pink-400">{tNav('home')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 text-sm"
                >
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 text-sm"
                >
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/products`}
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 text-sm"
                >
                  {tNav('products')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/articles`}
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 text-sm"
                >
                  {tNav('articles')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 text-sm"
                >
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-pink-600 dark:text-pink-400">{tContact('getInTouch')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400 text-sm group">
                <Phone size={16} className="text-pink-400 group-hover:text-pink-300 transition-colors" />
                <span className="group-hover:text-pink-300 transition-colors">
                  {settings?.phone || '+856 20 xxxxxxxx'}
                </span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm group">
                <Mail size={16} className="text-pink-400 group-hover:text-pink-300 transition-colors" />
                <span className="group-hover:text-pink-300 transition-colors">
                  {settings?.email || 'info@namngam.com'}
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-pink-600 dark:text-pink-400">{tFooter('socialMedia')}</h3>
            <div className="flex gap-3">
              {settings?.facebookPage && (
                <a
                  href={settings.facebookPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 backdrop-blur-sm border border-gray-700/50"
                  aria-label="Facebook"
                >
                  <Facebook size={20} className="text-gray-400 hover:text-white transition-colors" />
                </a>
              )}

              {settings?.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}${settings[`whatsappMessage_${locale}` as keyof typeof settings]
                    ? `?text=${encodeURIComponent(settings[`whatsappMessage_${locale}` as keyof typeof settings] as string)}`
                    : ''
                    }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gradient-to-br hover:from-green-500 hover:to-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30 backdrop-blur-sm border border-gray-700/50 group"
                  aria-label="WhatsApp"
                  title={tFooter('whatsappTooltip') || "Click to open WhatsApp"}
                >
                  <WhatsAppIcon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                  {/* Tooltip for mobile and desktop */}
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {tFooter('whatsappTooltip') || "Click to open WhatsApp"}
                  </span>
                </a>
              )}

              {settings?.lineId && (
                <a
                  href={`https://line.me/ti/p/~${settings.lineId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gradient-to-br hover:from-green-400 hover:to-green-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-400/30 backdrop-blur-sm border border-gray-700/50"
                  aria-label="LINE"
                >
                  <LineIcon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-pink-200 dark:border-pink-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center justify-center gap-2">
            <span className="text-pink-500 dark:text-pink-400">©</span>
            <span>{currentYear}</span>
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent font-semibold">NAMNGAM </span>
            <span>.</span>
            <span>{tFooter('allRightsReserved')}.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
