'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function BackButton() {
    const t = useTranslations('error');

    return (
        <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
        >
            <ArrowLeft size={20} />
            {t('goBack')}
        </button>
    );
}
