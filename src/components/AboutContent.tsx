'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PremiumLoading } from '@/components/shared/PremiumLoading';

interface AboutValue { id: string;
  icon: string;
  title_lo: string;
  title_en: string;
  description_lo?: string;
  description_en?: string;
  order: number; }

interface AboutPageData { id: string;
  title_lo: string;
  title_en: string;
  storyTitle_lo: string;
  storyTitle_en: string;
  storyParagraph1_lo?: string;
  storyParagraph1_en?: string;
  storyParagraph2_lo?: string;
  storyParagraph2_en?: string;
  backgroundImage?: string;
  founderImage?: string;
  founderName_lo?: string;
  founderName_en?: string;
  founderQuote_lo?: string;
  founderQuote_en?: string;
  values?: AboutValue[];
  updatedAt: string;
  // Add optional fields that might come from database
  aboutPageId?: string;
  createdAt?: string;
  heroDesignImage?: string; }

interface AboutContentProps {
  locale?: string;
}

export default function AboutContent({ locale }: AboutContentProps) {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAboutData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/about');
      const result = await response.json();

      if (result.success) {
        setAboutData(result.data);
      } else {
        console.error('Failed to fetch about data:', result.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, [locale]); // Remove fetchAboutData from dependencies to prevent infinite re-renders

  if (isLoading) {
    return <PremiumLoading message="Loading..." />;
  }

  if (!aboutData) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500">Failed to load about page content.</p>
      </div>
    );
  }

  // Helper function to get localized content
  const getLocalizedContent = (field: string) => {
    if (!aboutData) return '';
    const fieldName = `${field}_${locale}` as keyof AboutPageData;
    const localizedValue = aboutData[fieldName] as string;
    const fallbackValue = aboutData[`${field}_lo` as keyof AboutPageData] as string;
    return localizedValue || fallbackValue || '';
  };

  const getLocalizedValueContent = (value: AboutValue, field: string) => {
    const fieldName = `${field}_${locale}` as keyof AboutValue;
    const localizedValue = value[fieldName] as string;
    const fallbackValue = value[`${field}_lo` as keyof AboutValue] as string;
    return localizedValue || fallbackValue || '';
  };

  return (
    <section className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Enhanced Background with better visual effects */}
      {aboutData.backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={aboutData.backgroundImage}
            alt="About Background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.3) contrast(1.1)' }} // Darkened for better text contrast
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#FAFAFA]"></div>
        </div>
      )}

      {/* Abstract Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-800 text-sm font-medium tracking-wider mb-6 uppercase">
              Since 2023
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gray-900 leading-tight">
              {getLocalizedContent('title')}
            </h1>
            <div className="w-24 h-1 bg-rose-400 mx-auto rounded-full mb-8" />
          </motion.div>
        </div>

        {/* Story Section with Founder's Note Style */}
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  {aboutData.founderImage ? (
                    <Image
                      src={aboutData.founderImage}
                      alt={getLocalizedContent('founderName') || 'Founder'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-rose-100 flex items-center justify-center text-rose-300">
                      <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  )}
                </div>
                {aboutData.founderImage && (
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white p-6 rounded-xl shadow-xl flex flex-col justify-center items-center text-center border border-rose-100">
                    <span className="text-4xl font-heading text-rose-500 mb-2">100%</span>
                    <span className="text-sm text-gray-600 uppercase tracking-wide">Authentic<br />Crystals</span>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-gray-900">
                  {getLocalizedContent('storyTitle')}
                </h2>

                <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                  {getLocalizedContent('storyParagraph1') && (
                    <p>{getLocalizedContent('storyParagraph1')}</p>
                  )}

                  {getLocalizedContent('storyParagraph2') && (
                    <p>{getLocalizedContent('storyParagraph2')}</p>
                  )}

                  <div className="pt-8 mt-8 border-t border-rose-100">
                    {getLocalizedContent('founderQuote') ? (
                      <>
                        <p className="font-heading text-2xl text-gray-900 italic">
                          &ldquo;{getLocalizedContent('founderQuote')}&rdquo;
                        </p>
                        <p className="mt-4 text-sm font-bold text-rose-500 uppercase tracking-widest">
                          - {getLocalizedContent('founderName') || 'The Founder'}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-heading text-2xl text-gray-900 italic">
                          &ldquo;We believe in the healing power of nature and the beauty it brings to our lives.&rdquo;
                        </p>
                        <p className="mt-4 text-sm font-bold text-rose-500 uppercase tracking-widest">
                          - The Founder
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        {aboutData.values && aboutData.values.length > 0 && (
          <div className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <span className="text-rose-500 font-medium tracking-wider uppercase text-sm">Why Choose Us</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 text-gray-900">
                  Our Core Values
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {aboutData.values.map((value, index) => (
                  <motion.div
                    key={value.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group p-8 rounded-2xl bg-rose-50/50 hover:bg-rose-50 transition-colors duration-300 border border-transparent hover:border-rose-100"
                  >
                    <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 text-rose-500">
                      {value.icon}
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-4 text-gray-900">
                      {getLocalizedValueContent(value, 'title')}
                    </h3>
                    {getLocalizedValueContent(value, 'description') && (
                      <p className="text-gray-600 leading-relaxed">
                        {getLocalizedValueContent(value, 'description')}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
