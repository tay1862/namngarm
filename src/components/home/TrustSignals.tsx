'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Truck, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

const features = [
    {
        icon: ShieldCheck,
        titleKey: 'authenticity.title',
        descKey: 'authenticity.desc',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50 dark:bg-emerald-900/10',
    },
    {
        icon: Heart,
        titleKey: 'curated.title',
        descKey: 'curated.desc',
        color: 'text-rose-600',
        bg: 'bg-rose-50 dark:bg-rose-900/10',
    },
    {
        icon: Sparkles,
        titleKey: 'quality.title',
        descKey: 'quality.desc',
        color: 'text-amber-600',
        bg: 'bg-amber-50 dark:bg-amber-900/10',
    },
    {
        icon: Truck,
        titleKey: 'shipping.title',
        descKey: 'shipping.desc',
        color: 'text-blue-600',
        bg: 'bg-blue-50 dark:bg-blue-900/10',
    },
];

export default function TrustSignals() {
    const t = useTranslations('home.trust');

    return (
        <section className="py-20 bg-secondary/50 dark:bg-secondary/5 relative overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${feature.bg} ${feature.color}`}>
                                <feature.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-heading font-bold mb-3 text-gray-900 dark:text-white">
                                {t(feature.titleKey)}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {t(feature.descKey)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
