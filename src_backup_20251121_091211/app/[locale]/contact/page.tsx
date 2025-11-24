'use client';

import { useTranslations, useLocale } from 'next-intl';
import { MessageCircle, Facebook, Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSettings } from '@/hooks/useSettings';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const { settings, loading } = useSettings();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Abstract Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-800 text-sm font-medium tracking-wider mb-6 uppercase">
              Contact Us
            </span>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-gray-900 leading-tight">
              {t('getInTouch')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              {t('description')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Contact Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {settings?.whatsapp && (
                <motion.a
                  variants={itemVariants}
                  href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-8 rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle size={28} className="text-[#25D366]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2 text-gray-900">WhatsApp</h3>
                  <p className="text-gray-500 text-sm mb-4">{t('whatsappContact')}</p>
                  <span className="text-rose-500 font-medium group-hover:text-rose-600 flex items-center gap-2">
                    Chat Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </motion.a>
              )}

              {settings?.facebookPage && (
                <motion.a
                  variants={itemVariants}
                  href={settings.facebookPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-8 rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#1877F2]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Facebook size={28} className="text-[#1877F2]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2 text-gray-900">Facebook</h3>
                  <p className="text-gray-500 text-sm mb-4">{t('facebookContact')}</p>
                  <span className="text-rose-500 font-medium group-hover:text-rose-600 flex items-center gap-2">
                    Visit Page <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </motion.a>
              )}

              {settings?.lineId && (
                <motion.a
                  variants={itemVariants}
                  href={`https://line.me/ti/p/~${settings.lineId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-8 rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#00C300]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-[#00C300]">LINE</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2 text-gray-900">LINE</h3>
                  <p className="text-gray-500 text-sm mb-4">{t('lineContact')}</p>
                  <span className="text-rose-500 font-medium group-hover:text-rose-600 flex items-center gap-2">
                    Add Friend <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </motion.a>
              )}

              {settings?.phone && (
                <motion.a
                  variants={itemVariants}
                  href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                  className="group p-8 rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-rose-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Phone size={28} className="text-rose-500" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2 text-gray-900">{t('phone')}</h3>
                  <p className="text-gray-500 text-sm mb-4">{t('phoneContact')}</p>
                  <span className="text-rose-500 font-medium group-hover:text-rose-600 flex items-center gap-2">
                    {settings.phone}
                  </span>
                </motion.a>
              )}
            </div>

            {/* Address & Info Card */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="font-heading font-bold text-2xl mb-6">{t('ourAddress')}</h3>
                    {settings?.[`address_${locale}` as keyof typeof settings] && (
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-rose-200 flex-shrink-0 mt-1" />
                        <p className="text-rose-50 leading-relaxed whitespace-pre-line">
                          {settings[`address_${locale}` as keyof typeof settings]}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 border-t border-white/20">
                    <h3 className="font-heading font-bold text-xl mb-4">Business Hours</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-rose-100">
                        <Clock className="w-5 h-5" />
                        <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex items-center gap-3 text-rose-100">
                        <Clock className="w-5 h-5" />
                        <span>Sat - Sun: 10:00 AM - 4:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/20">
                    <p className="text-rose-100 italic text-sm">
                      &ldquo;Visit our showroom to experience the energy of our crystals in person.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
