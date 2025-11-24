'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, MessageCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface PremiumProductCardProps { product: {
        id: string;
        slug: string;
        name_lo: string;
        name_en: string;
        description_lo?: string;
        description_en?: string;
        price?: number;
        currency?: string;
        featuredImage?: string;
        isFeatured?: boolean;
        category?: {
            name_lo: string;
            name_en: string; };
    };
    onQuickView?: () => void;
    onAddToCart?: () => void;
}

export default function PremiumProductCard({
    product,
    onQuickView,
    onAddToCart
}: PremiumProductCardProps) {
    const locale = useLocale();
    const t = useTranslations();

    const name = product[`name_${locale}` as keyof typeof product] as string || product.name_en;
    const description = product[`description_${locale}` as keyof typeof product] as string || product.description_en;
    const categoryName = product.category?.[`name_${locale}` as keyof typeof product.category] as string || product.category?.name_en;

    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -12 }}
        >
            {/* Card Container */}
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-700">
                {/* Image Container */}
                <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {product.featuredImage ? (
                            <Image
                                src={product.featuredImage}
                                alt={name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Quick View Button */}
                        {onQuickView && (
                            <motion.button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onQuickView();
                                }}
                                className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-gray-800 transition-all"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <Eye size={20} className="text-gray-900 dark:text-white" />
                            </motion.button>
                        )}

                        {/* Featured Badge */}
                        {product.isFeatured && (
                            <motion.div
                                className="absolute top-4 left-4 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-full shadow-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            >
                                Featured
                            </motion.div>
                        )}
                    </div>
                </Link>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Category */}
                    {categoryName && (
                        <p className="eyebrow mb-3">
                            {categoryName}
                        </p>
                    )}

                    {/* Name */}
                    <Link href={`/products/${product.slug}`}>
                        <h3 className="text-xl md:text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {name}
                        </h3>
                    </Link>

                    {/* Description */}
                    {description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6 line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    )}

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            {product.price && (
                                <>
                                    <span className="text-2xl md:text-3xl font-heading font-bold text-primary">
                                        {product.price.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                        {product.currency || 'LAK'}
                                    </span>
                                </>
                            )}
                        </div>

                        {onAddToCart && (
                            <motion.button
                                onClick={onAddToCart}
                                className="px-6 py-3 bg-primary text-white rounded-full shadow-lg hover:shadow-primary/50 flex items-center gap-2 font-medium text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <MessageCircle size={18} />
                                <span>{t('product.interested')}</span>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>

            {/* Decorative Glow Effect */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />
        </motion.div>
    );
}
