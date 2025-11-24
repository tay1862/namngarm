'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PremiumLoadingProps {
    message?: string;
    showLogo?: boolean;
}

export function PremiumLoading({ message, showLogo = true }: PremiumLoadingProps) {

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
                {/* Logo Flip Animation Only */}
                <motion.div
                    className="relative w-24 h-24 mx-auto mb-8"
                    animate={{
                        rotateY: [0, 180, 360],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-full h-full relative">
                        <Image
                            src="/Logo_Namngam_FINAL-03.png"
                            alt="Loading"
                            width={96}
                            height={96}
                            className="object-contain drop-shadow-lg"
                        />
                    </div>
                </motion.div>

                {/* Loading text */}
                <motion.p
                    className="text-gray-700 dark:text-gray-300 text-lg font-medium mb-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    {message || 'ກຳລັງໂຫລດ...'}
                </motion.p>

                {/* Animated dots */}
                <div className="flex items-center justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 bg-pink-400 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function PremiumLoadingPage({ message }: { message?: string }) {

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center z-50">
            <div className="text-center">
                {/* Logo Flip Animation */}
                <motion.div
                    className="relative w-32 h-32 mx-auto mb-8"
                    animate={{
                        rotateY: [0, 180, 360],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-full h-full relative">
                        <Image
                            src="/Logo_Namngam_FINAL-03.png"
                            alt="NAMNGAM"
                            width={128}
                            height={128}
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Loading text */}
                <motion.h2
                    className="text-2xl font-semibold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent mb-4 font-lao-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    NAMNGAM
                </motion.h2>

                <motion.p
                    className="text-gray-600 dark:text-gray-400 text-lg mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {message || 'ກຳລັງໂຫລດ...'}
                </motion.p>

                {/* Progress bar */}
                <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
                    <motion.div
                        className="h-full bg-gradient-to-r from-pink-400 to-pink-500"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </div>
        </div>
    );
}

export function PremiumLoadingSpinner({ size = 40 }: { size?: number }) {
    return (
        <motion.div
            className="relative inline-block"
            style={{ width: size, height: size }}
            animate={{
                rotateY: [0, 180, 360],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <Image
                src="/Logo_Namngam_FINAL-03.png"
                alt="Loading"
                width={size}
                height={size}
                className="object-contain"
            />
        </motion.div>
    );
}

export function PremiumCardLoader() {
    return (
        <div className="animate-pulse">
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl h-80 mb-6 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
            <div className="h-6 bg-pink-100 dark:bg-gray-700 rounded-lg mb-3 w-3/4" />
            <div className="h-4 bg-pink-50 dark:bg-gray-800 rounded-lg w-1/2" />
        </div>
    );
}

export function PremiumButtonLoading() {
    return (
        <div className="flex items-center gap-2">
            <PremiumLoadingSpinner size={20} />
            <span className="font-lao-text">กำลังดำเนินการ...</span>
        </div>
    );
}

export default PremiumLoading;
