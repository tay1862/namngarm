'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AboutValue {
  id: string;
  icon: string;
  title_lo: string;
  title_th: string;
  title_zh: string;
  title_en: string;
  description_lo?: string;
  description_th?: string;
  description_zh?: string;
  description_en?: string;
  order: number;
}

interface AboutPageData {
  id: string;
  title_lo: string;
  title_th: string;
  title_zh: string;
  title_en: string;
  storyTitle_lo: string;
  storyTitle_th: string;
  storyTitle_zh: string;
  storyTitle_en: string;
  storyParagraph1_lo?: string;
  storyParagraph1_th?: string;
  storyParagraph1_zh?: string;
  storyParagraph1_en?: string;
  storyParagraph2_lo?: string;
  storyParagraph2_th?: string;
  storyParagraph2_zh?: string;
  storyParagraph2_en?: string;
  backgroundImage?: string;
  values?: AboutValue[];
  updatedAt: string;
  // Add optional fields that might come from database
  aboutPageId?: string;
  createdAt?: string;
  heroBadgeImage?: string;
  heroBadgeText_lo?: string;
  heroBadgeText_th?: string;
  heroBadgeText_zh?: string;
  heroBadgeText_en?: string;
  heroDesignImage?: string;
}

interface AboutContentProps {
  locale: string;
}

export default function AboutContent({ locale }: AboutContentProps) {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/about');
      const result = await response.json();
      
      if (result.success) {
        setAboutData(result.data);
      } else {
        console.error('Failed to fetch about data:', result.error);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-8"></div>
          <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-8 w-5/6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500">Failed to load about page content.</p>
      </div>
    );
  }

  // Helper function to get localized content
  const getLocalizedContent = (field: string) => {
    const fieldName = `${field}_${locale}` as keyof AboutPageData;
    return aboutData[fieldName] as string || aboutData[`${field}_lo` as keyof AboutPageData] as string || '';
  };

  const getLocalizedValueContent = (value: AboutValue, field: string) => {
    const fieldName = `${field}_${locale}` as keyof AboutValue;
    return value[fieldName] as string || value[`${field}_lo` as keyof AboutValue] as string || '';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-heading font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
        {getLocalizedContent('title')}
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-pink-500">
            {getLocalizedContent('storyTitle')}
          </h2>
          
          {getLocalizedContent('storyParagraph1') && (
            <p className="text-gray-700 leading-relaxed mb-4">
              {getLocalizedContent('storyParagraph1')}
            </p>
          )}
          
          {getLocalizedContent('storyParagraph2') && (
            <p className="text-gray-700 leading-relaxed">
              {getLocalizedContent('storyParagraph2')}
            </p>
          )}
        </div>

        {aboutData.values && aboutData.values.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutData.values.map((value) => (
              <div key={value.id} className="card text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="font-semibold text-lg mb-2">
                  {getLocalizedValueContent(value, 'title')}
                </h3>
                {getLocalizedValueContent(value, 'description') && (
                  <p className="text-gray-600 text-sm">
                    {getLocalizedValueContent(value, 'description')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
