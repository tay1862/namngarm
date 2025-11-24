'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface PremiumHeroProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    description?: string;
    primaryCTA?: {
        label: string;
        href: string;
    };
    secondaryCTA?: {
        label: string;
        href: string;
    };
    backgroundImage?: string;
    heroDesignImage?: string;
}

export default function PremiumHero({
    eyebrow,
    title,
    subtitle,
    description,
    primaryCTA,
    secondaryCTA,
    backgroundImage,
    heroDesignImage,
}: PremiumHeroProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {backgroundImage ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white dark:to-gray-900" />
                    </div>
                ) : (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/20 dark:from-primary/5 dark:to-gray-900"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                )}
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom">
                <div className={`grid gap-12 items-center ${heroDesignImage ? 'lg:grid-cols-2' : 'max-w-5xl mx-auto text-center'}`}>
                    <div className={heroDesignImage ? 'text-left' : ''}>
                        {/* Eyebrow Text */}
                        {eyebrow && (
                            <motion.p
                                className="eyebrow mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                            >
                                {eyebrow}
                            </motion.p>
                        )}

                        {/* Main Heading */}
                        <motion.h1
                            className="font-heading font-bold mb-8 leading-[1.1]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {subtitle && (
                                <span className="block text-3xl md:text-5xl lg:text-6xl mb-4 text-gray-700 dark:text-gray-300 font-normal">
                                    {subtitle}
                                </span>
                            )}
                            <span className="gradient-text block">
                                {title}
                            </span>
                        </motion.h1>

                        {/* Description */}
                        {description && (
                            <motion.p
                                className={`lead mb-12 ${heroDesignImage ? '' : 'mx-auto'}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            >
                                {description}
                            </motion.p>
                        )}

                        {/* CTA Buttons */}
                        {(primaryCTA || secondaryCTA) && (
                            <motion.div
                                className={`flex flex-col sm:flex-row gap-4 md:gap-6 ${heroDesignImage ? 'justify-start' : 'justify-center'} items-center`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            >
                                {primaryCTA && (
                                    <Link href={primaryCTA.href}>
                                        <motion.button
                                            className="group relative px-8 py-4 bg-gradient-to-r from-pink-300 to-pink-400 text-white font-semibold rounded-full shadow-lg shadow-pink-300/40 hover:shadow-xl hover:shadow-pink-400/50 transition-all duration-300 overflow-hidden min-w-[200px]"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {/* Animated Gradient Overlay */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                animate={{ x: ['-200%', '200%'] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                            />

                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-200 to-rose-200 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

                                            {/* Button Content */}
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                {primaryCTA.label}
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </motion.button>
                                    </Link>
                                )}

                                {secondaryCTA && (
                                    <Link href={secondaryCTA.href}>
                                        <motion.button
                                            className="group relative px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-full border-2 border-pink-200 dark:border-pink-900 hover:border-pink-300 dark:hover:border-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden min-w-[200px]"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {/* Hover Background */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                initial={false}
                                            />

                                            {/* Button Content */}
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {secondaryCTA.label}
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </motion.button>
                                    </Link>
                                )}
                            </motion.div>
                        )}
                    </div>

                    {/* Hero Design Image */}
                    {heroDesignImage && (
                        <motion.div
                            className="relative hidden lg:block"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-pink-200/50 dark:shadow-none transform hover:scale-[1.02] transition-transform duration-500">
                                <img
                                    src={heroDesignImage}
                                    alt="Hero Design"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-transparent pointer-events-none" />
                            </div>

                            {/* Decorative blobs behind image */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl -z-10" />
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl -z-10" />
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Scroll Indicator - Hidden */}
            {/* <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="w-8 h-12 border-2 border-primary dark:border-primary/80 rounded-full flex items-start justify-center p-2">
                    <motion.div
                        className="w-2 h-2 bg-primary dark:bg-primary/80 rounded-full"
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
                    />
                </div>
                <ChevronDown className="mt-2 text-primary dark:text-primary/80 mx-auto" size={24} />
            </motion.div> */}

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 dark:bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>
    );
}
