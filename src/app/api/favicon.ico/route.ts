import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
    try {
        // Try to read favicon from public directory
        const faviconPath = join(process.cwd(), 'public', 'favicon.ico');
        const favicon = await readFile(faviconPath);

        return new NextResponse(favicon, {
            status: 200,
            headers: {
                'Content-Type': 'image/x-icon',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error serving favicon:', error);
        return new NextResponse(null, { status: 404 });
    }
}
