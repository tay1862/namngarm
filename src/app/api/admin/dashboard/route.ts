import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Parallelize all count queries
        const [
            totalProducts,
            totalArticles,
            totalCategories,
            totalUsers,
            recentProducts,
            recentArticles
        ] = await Promise.all([
            prisma.product.count(),
            prisma.article.count(),
            prisma.category.count(),
            prisma.user.count(),
            prisma.product.findMany({
                take: 3,
                orderBy: { updatedAt: 'desc' },
                select: { id: true, name_en: true, updatedAt: true }
            }),
            prisma.article.findMany({
                take: 3,
                orderBy: { updatedAt: 'desc' },
                select: { id: true, title_en: true, updatedAt: true }
            })
        ]);

        // Construct activity log from recent updates
        const recentActivity = [
            ...recentProducts.map(p => ({
                id: `prod-${p.id}`,
                type: 'update' as const,
                resource: 'Product',
                description: `Product "${p.name_en}" was updated`,
                timestamp: p.updatedAt.toISOString(),
                user: 'System' // In a real app, we'd track who updated it
            })),
            ...recentArticles.map(a => ({
                id: `art-${a.id}`,
                type: 'update' as const,
                resource: 'Article',
                description: `Article "${a.title_en}" was updated`,
                timestamp: a.updatedAt.toISOString(),
                user: 'System'
            }))
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 5);

        // Mock system health for now
        const systemHealth = {
            status: 'healthy',
            database: 'connected',
            storage: 'normal',
            lastBackup: new Date().toISOString()
        };

        return NextResponse.json({
            totalProducts,
            totalArticles,
            totalCategories,
            totalViews: 1234, // Mocked for now, or implement real analytics later
            totalUsers,
            recentActivity,
            systemHealth
        });

    } catch (error) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard data' },
            { status: 500 }
        );
    }
}
