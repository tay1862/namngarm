'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Share2, ChevronDown, Check, Star, ShieldCheck, Truck, RefreshCw, MessageCircle } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useSettings } from '@/hooks/useSettings';

interface Product {
    id: string;
    name_lo: string;
    name_en: string;
    description_lo: string;
    description_en: string;
    price: number | null;
    currency: string | null;
    sku: string | null;
    featuredImage: string | null;
    images: any[];
    benefits_lo?: string[];
    benefits_en?: string[];
    howToUse_lo?: string[];
    howToUse_en?: string[];
}

interface ProductDetailClientProps {
    product: Product;
    translations: {
        addToCart: string;
        buyNow: string;
        description: string;
        benefits: string;
        howToUse: string;
        share: string;
        sku: string;
        interested: string;
    };
}

export default function ProductDetailClient({ product, translations }: ProductDetailClientProps) {
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState<'description' | 'benefits' | 'howToUse'>('description');
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const { settings } = useSettings();

    // Helper to get localized content
    const getLocalizedContent = (field: string) => {
        // @ts-ignore
        const content = product[`${field}_${locale}`] || product[`${field}_en`];

        // Fallback to Lao if English is missing (specifically for array fields like benefits/howToUse)
        // Check for null, empty array, or array with only empty strings
        const isEmpty = !content ||
            (Array.isArray(content) && (content.length === 0 || content.every((item: string) => !item.trim())));

        if (isEmpty) {
            // @ts-ignore
            return product[`${field}_lo`] || [];
        }

        return content;
    };

    const name = getLocalizedContent('name');
    const description = getLocalizedContent('description');
    const benefits = getLocalizedContent('benefits') as string[] || [];
    const howToUse = getLocalizedContent('howToUse') as string[] || [];

    console.log('Product Data:', product);
    console.log('Benefits:', benefits);
    console.log('HowToUse:', howToUse);

    // Format price
    const formattedPrice = new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
        style: 'currency',
        currency: product.currency || 'LAK',
        minimumFractionDigits: 0
    }).format(Number(product.price));

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen pb-20">
            <div className="container-custom pt-32 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column: Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="space-y-6"
                    >
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-2xl">
                            {product.featuredImage ? (
                                <Image
                                    src={product.featuredImage}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                                    <span className="text-6xl">✨</span>
                                </div>
                            )}

                            {/* Floating Badge */}
                            <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                                <span className="text-sm font-medium text-primary">Premium Collection</span>
                            </div>
                        </div>

                        {/* Thumbnails (Placeholder for now) */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 cursor-pointer hover:ring-2 ring-primary transition-all"></div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="flex flex-col"
                    >
                        {/* Breadcrumb-ish */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                            <span>Home</span>
                            <span>/</span>
                            <span>Products</span>
                            <span>/</span>
                            <span className="text-primary font-medium">{name}</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            {name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-medium text-primary">{formattedPrice}</span>
                            {product.sku && (
                                <span className="text-sm text-gray-500 dark:text-gray-400 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                                    {translations.sku}: {product.sku}
                                </span>
                            )}
                            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-sm font-medium">
                                <ShieldCheck size={16} />
                                <span>100% Authentic</span>
                            </div>
                        </div>

                        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                            <p>{description}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 w-fit">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                                >
                                    +
                                </button>
                            </div>

                            <a
                                href={`https://wa.me/${settings?.whatsapp?.replace(/[^\d]/g, '') || ''}?text=${encodeURIComponent(translations.interested + ' ' + name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                                {translations.interested}
                            </a>

                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:border-primary hover:text-primary'}`}
                            >
                                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                            </button>
                        </div>

                        {/* Trust Signals (Shipping/Returns) - REMOVED as per request */}

                        {/* Tabs */}
                        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
                            <div className="flex gap-8 mb-6 border-b border-gray-200 dark:border-gray-800">
                                {['description', 'benefits', 'howToUse'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as any)}
                                        className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab
                                            ? 'text-primary'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                            }`}
                                    >
                                        {translations[tab as keyof typeof translations]}
                                        {activeTab === tab && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="min-h-[200px]">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'description' && (
                                        <motion.div
                                            key="description"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-gray-600 dark:text-gray-300 leading-relaxed"
                                        >
                                            {description}
                                        </motion.div>
                                    )}

                                    {activeTab === 'benefits' && (
                                        <motion.div
                                            key="benefits"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {benefits.length > 0 ? (
                                                <ul className="space-y-3">
                                                    {benefits.map((item, index) => (
                                                        <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                                            <div className="mt-1 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 text-green-600 dark:text-green-400">
                                                                <Check size={12} strokeWidth={3} />
                                                            </div>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-500 italic">No benefits information available.</p>
                                            )}
                                        </motion.div>
                                    )}

                                    {activeTab === 'howToUse' && (
                                        <motion.div
                                            key="howToUse"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {howToUse.length > 0 ? (
                                                <div className="space-y-4">
                                                    {howToUse.map((item, index) => (
                                                        <div key={index} className="flex gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-serif font-bold flex-shrink-0">
                                                                {index + 1}
                                                            </div>
                                                            <p className="text-gray-600 dark:text-gray-300 pt-1">{item}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 italic">No usage instructions available.</p>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
