'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaLine, FaPhone, FaEnvelope, FaTelegram, FaWeixin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';

interface QuickLink {
  id: string;
  type: 'WHATSAPP' | 'FACEBOOK' | 'LINE' | 'PHONE' | 'EMAIL' | 'TELEGRAM' | 'WECHAT' | 'CUSTOM';
  label_lo: string;
  label_en: string;
  url: string;
  icon?: string;
  color?: string;
  order: number;
  isActive: boolean;
}

// Icon mapping
const iconMap = {
  WHATSAPP: { icon: FaWhatsapp, defaultColor: '#25D366' },
  FACEBOOK: { icon: FaFacebook, defaultColor: '#1877F2' },
  LINE: { icon: FaLine, defaultColor: '#00B900' },
  PHONE: { icon: FaPhone, defaultColor: '#F875AA' },
  EMAIL: { icon: FaEnvelope, defaultColor: '#EA4335' },
  TELEGRAM: { icon: FaTelegram, defaultColor: '#0088cc' },
  WECHAT: { icon: FaWeixin, defaultColor: '#09B83E' },
  CUSTOM: { icon: MessageCircle, defaultColor: '#F875AA' }
};

export default function FloatingQuickLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();

  // Fetch quick links from database
  useEffect(() => {
    async function fetchQuickLinks() {
      try {
        const res = await fetch('/api/public/quick-links');
        const data = await res.json();
        if (data.success) {
          setQuickLinks(data.data);
        }
      } catch (error) {
        console.error('Error fetching quick links:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuickLinks();
  }, []);

  if (loading || quickLinks.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-3 items-end mb-2"
          >
            {quickLinks.map((link, index) => {
              const IconComponent = iconMap[link.type]?.icon || MessageCircle;
              const color = link.color || iconMap[link.type]?.defaultColor || '#F875AA';
              const label = link[`label_${locale}` as keyof QuickLink] as string || link.label_en;

              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="group flex items-center gap-3 pl-4 pr-2 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, x: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                    {label}
                  </span>
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full text-white shadow-md transition-transform duration-500 group-hover:rotate-12"
                    style={{ backgroundColor: color }}
                  >
                    <IconComponent size={20} />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-2xl flex items-center justify-center overflow-hidden z-50 hover:scale-105 transition-all duration-300 active:scale-95"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle size={24} className="fill-current" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-900 dark:border-white animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
