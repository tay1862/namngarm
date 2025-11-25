'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, RefreshCw, AlertTriangle, ArrowLeft } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50">
      <div className="container-custom text-center max-w-2xl mx-auto px-6">
        {/* Error Illustration */}
        <div className="relative mb-12">
          <div className="text-9xl font-bold text-red-200 mb-4">500</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertTriangle size={80} className="text-red-400" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-800">
          Something Went Wrong
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We&apos;re experiencing some technical difficulties. Please try again in a few moments.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <h3 className="font-semibold text-red-800 mb-2">Error Details (Development):</h3>
            <p className="text-sm text-red-700 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            onClick={reset}
            size="lg"
            className="w-full sm:w-auto group"
          >
            <RefreshCw size={20} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Button>

          <Link href="/">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto group">
              <Home size={20} className="mr-2 group-hover:scale-110 transition-transform" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Helpful Information */}
        <div className="p-8 bg-white rounded-2xl shadow-lg border border-red-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            What You Can Do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <RefreshCw size={20} className="text-red-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800 mb-1">Refresh the Page</div>
                <div className="text-sm text-gray-600">Sometimes a simple refresh can fix the issue</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <ArrowLeft size={20} className="text-red-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800 mb-1">Go Back</div>
                <div className="text-sm text-gray-600">Return to the previous page and try again</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                🕐
              </div>
              <div>
                <div className="font-medium text-gray-800 mb-1">Try Later</div>
                <div className="text-sm text-gray-600">We might be experiencing high traffic</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                📞
              </div>
              <div>
                <div className="font-medium text-gray-800 mb-1">Contact Support</div>
                <div className="text-sm text-gray-600">Get help from our support team</div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Error */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            If the error persists, please let us know
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
          >
            Report Error
            <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}