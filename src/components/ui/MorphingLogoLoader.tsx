'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface MorphingLogoLoaderProps {
    size?: number;
    showText?: boolean;
    text?: string;
}

export default function MorphingLogoLoader({
    size = 80,
    showText = true,
    text = 'Loading...'
}: MorphingLogoLoaderProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            {/* Morphing Logo Animation */}
            <div className="relative" style={{ width: size, height: size }}>
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-primary/20"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.2, 1], // Slow ease-out
                    }}
                />

                {/* Middle Ring */}
                <motion.div
                    className="absolute inset-2 rounded-full border-4 border-primary/40"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [360, 180, 0],
                        opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                />

                {/* Logo Container with Morphing Effect */}
                <motion.div
                    className="absolute inset-4 flex items-center justify-center"
                    animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                >
                    {/* Gradient Background */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary/80 to-secondary"
                        animate={{
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                    />

                    {/* Logo Image - Replace with your actual logo */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <motion.div
                            className="text-white font-heading font-bold text-2xl"
                            animate={{
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            N
                        </motion.div>
                    </div>
                </motion.div>

                {/* Shimmer Effect */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    }}
                    animate={{
                        x: [-size * 2, size * 2],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                />
            </div>

            {/* Loading Text */}
            {showText && (
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {text}
                    </p>
                    <motion.div
                        className="flex items-center justify-center gap-1 mt-2"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                    >
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="w-2 h-2 rounded-full bg-primary" style={{ animationDelay: '0.2s' }} />
                        <span className="w-2 h-2 rounded-full bg-primary" style={{ animationDelay: '0.4s' }} />
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

// Full Page Loading Overlay
export function FullPageLoader({ text = 'Loading...' }: { text?: string }) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
            <MorphingLogoLoader size={100} text={text} />
        </motion.div>
    );
}

// Inline Loading Spinner (for buttons, etc.)
export function InlineLoader({ size = 20 }: { size?: number }) {
    return (
        <motion.div
            className="inline-block"
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            <div
                className="rounded-full border-2 border-current border-t-transparent"
                style={{ width: size, height: size }}
            />
        </motion.div>
    );
}
