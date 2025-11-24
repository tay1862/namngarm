'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CenterZoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    showCloseButton?: boolean;
    closeOnBackdrop?: boolean;
    className?: string;
}

const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
};

export default function CenterZoomModal({
    isOpen,
    onClose,
    children,
    title,
    maxWidth = 'md',
    showCloseButton = true,
    closeOnBackdrop = true,
    className = '',
}: CenterZoomModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const modalContent = (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        onClick={closeOnBackdrop ? onClose : undefined}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            className={`
                relative w-full ${maxWidthClasses[maxWidth]} 
                bg-white dark:bg-gray-900 
                rounded-2xl shadow-2xl 
                pointer-events-auto
                overflow-hidden
                ${className}
              `}
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                                y: 20,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.4, 0, 0.2, 1], // Slow ease-out
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative gradient border */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 pointer-events-none" />

                            {/* Close Button */}
                            {showCloseButton && (
                                <motion.button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <X size={20} />
                                </motion.button>
                            )}

                            {/* Title */}
                            {title && (
                                <motion.div
                                    className="px-6 py-5 border-b border-gray-200 dark:border-gray-700"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                                        {title}
                                    </h2>
                                </motion.div>
                            )}

                            {/* Content */}
                            <motion.div
                                className="relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            >
                                {children}
                            </motion.div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );

    // Render in portal to avoid z-index issues
    if (typeof window === 'undefined') return null;
    return createPortal(modalContent, document.body);
}

// Preset Modal Variants
export function SuccessModal({
    isOpen,
    onClose,
    title = 'Success!',
    message,
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
}) {
    return (
        <CenterZoomModal isOpen={isOpen} onClose={onClose} maxWidth="sm">
            <div className="p-6 text-center">
                <motion.div
                    className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="btn-primary w-full"
                >
                    OK
                </button>
            </div>
        </CenterZoomModal>
    );
}

export function ErrorModal({
    isOpen,
    onClose,
    title = 'Error',
    message,
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
}) {
    return (
        <CenterZoomModal isOpen={isOpen} onClose={onClose} maxWidth="sm">
            <div className="p-6 text-center">
                <motion.div
                    className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="btn-secondary w-full"
                >
                    Close
                </button>
            </div>
        </CenterZoomModal>
    );
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'primary',
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'primary' | 'danger';
}) {
    return (
        <CenterZoomModal isOpen={isOpen} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="btn-secondary flex-1"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 ${variant === 'danger' ? 'btn-danger' : 'btn-primary'}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </CenterZoomModal>
    );
}
