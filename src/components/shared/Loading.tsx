'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Loading({ message }: { message?: string }) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        {/* Logo Flip Animation */}
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
          <Image
            src="/Logo_Namngam_FINAL-03.png"
            alt="Loading"
            width={96}
            height={96}
            className="object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* Loading text */}
        <p className="text-neutral-600 text-lg font-lao-text">
          {message || t('common.loading')}
        </p>
      </div>
    </div>
  );
}

export function LoadingPage({ message }: { message?: string }) {
  const t = useTranslations();

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
          <Image
            src="/Logo_Namngam_FINAL-03.png"
            alt="NAMNGAM"
            width={128}
            height={128}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        <p className="text-neutral-600 text-xl font-medium font-lao-text">
          {message || t('common.loading')}
        </p>
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
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

export function FullPageLoader({ message }: { message?: string }) {
  const t = useTranslations();

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
          <Image
            src="/Logo_Namngam_FINAL-03.png"
            alt="Loading"
            width={128}
            height={128}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        <p className="text-neutral-600 text-xl font-medium font-lao-text">
          {message || t('common.loading')}
        </p>
      </div>
    </div>
  );
}

export function CardLoader() {
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
