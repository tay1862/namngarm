'use client';

import { useLoading } from '@/lib/loading-context';
import { PremiumLoadingPage } from '@/components/shared/PremiumLoading';

export default function GlobalLoader() {
  const { isLoading, loadingMessage } = useLoading();

  if (isLoading) {
    return <PremiumLoadingPage message={loadingMessage} />;
  }

  return null;
}