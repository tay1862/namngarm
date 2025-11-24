'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  locale: string;
}

export default function FAQSection({ locale }: FAQSectionProps) {
  const t = useTranslations();
  const tFaq = useTranslations('faq');
  const tContact = useTranslations('contact');
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(`/api/faqs?limit=4&locale=${locale}`);
        if (response.ok) {
          const data = await response.json();
          const transformedFAQs = data.map((faq: any) => ({
            id: faq.id,
            question: faq[`question_${locale}`] || faq.question_en,
            answer: faq[`answer_${locale}`] || faq.answer_en,
            category: faq.category?.[`name_${locale}`] || faq.category?.name_en || (locale === 'th' ? 'ทั่วไป' : locale === 'lo' ? 'ທົ່ວໄປ' : 'General')
          }));
          setFaqs(transformedFAQs);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [locale, tFaq]); // Add locale and tFaq as dependencies

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="section-padding soft-gradient-bg">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-50 rounded-xl mb-4">
            <HelpCircle className="w-6 h-6 text-pink-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-3">
            {tFaq('title')}
          </h2>
          <p className="text-neutral-500 text-base max-w-xl mx-auto font-light">
            {tFaq('description')}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="text-center">
                <div className="relative">
                  <ChevronDown size={32} className="animate-spin text-pink-400 mx-auto mb-3" />
                </div>
                <p className="text-neutral-400 text-sm">{tFaq('loadingFaqs')}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl overflow-hidden border border-neutral-100 hover:border-pink-100 hover:shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-neutral-50/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-pink-400 font-medium text-xs tracking-wide">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className={`font-medium text-neutral-700 pr-4 text-sm md:text-base transition-colors duration-200 ${openItem === faq.id ? 'text-pink-500' : ''}`}>
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${openItem === faq.id ? 'rotate-180 text-pink-400' : ''
                        }`}
                    />
                  </button>

                  {openItem === faq.id && (
                    <div className="px-5 pb-4">
                      <div className="pl-8 border-l-2 border-pink-50 ml-1">
                        <p className="text-neutral-500 leading-relaxed text-sm font-light">
                          {faq.answer}
                        </p>
                        <div className="mt-2">
                          <span className="inline-block px-2 py-0.5 bg-neutral-50 text-neutral-400 text-[10px] uppercase tracking-wider rounded-md">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-neutral-400 text-sm mb-4 font-light">
            {tFaq('stillHaveQuestions')}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => window.location.href = `/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/20 px-6 py-2.5 text-sm"
            >
              {tContact('getInTouch')}
            </button>
            <button
              onClick={() => window.location.href = `/${locale}/faq`}
              className="inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 bg-white text-neutral-600 border border-neutral-200 hover:border-pink-200 hover:text-pink-500 px-6 py-2.5 text-sm"
            >
              {tFaq('viewAll')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
