import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ArticlesList from '@/components/articles/ArticlesList';
import DynamicBackground from '@/components/shared/DynamicBackground';

export const dynamic = 'force-dynamic';

interface ArticlesPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: ArticlesPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return {
    title: t('article.allArticles'),
    description: t('article.description'),
  };
}

export default async function ArticlesPage({ params: { locale } }: ArticlesPageProps) {
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen">
      <DynamicBackground type="articlesBg" fallbackClass="bg-gradient-to-br from-pink-50 via-white to-pink-50">
        <section className="py-16">
          <div className="container-custom">
            <h1 className="text-5xl font-heading font-bold mb-4 text-center bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              {t('article.allArticles')}
            </h1>
            <p className="text-center text-gray-600 mb-12">
              {t('article.description')}
            </p>

            <ArticlesList />
          </div>
        </section>
      </DynamicBackground>
    </div>
  );
}
