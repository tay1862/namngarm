import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id } = params;

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        question_lo: body.question_lo,

        question_en: body.question_en,
        answer_lo: body.answer_lo,

        answer_en: body.answer_en,
        categoryId: body.categoryId || null,
        order: parseInt(String(body.order)),
        isActive: body.isActive
      },
      include: {
        category: true
      }
    });

    return NextResponse.json(faq);
  } catch (error) {
    console.error('FAQ update error:', error);
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.fAQ.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('FAQ deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}
