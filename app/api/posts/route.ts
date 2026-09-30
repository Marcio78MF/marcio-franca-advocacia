import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  try {
    const posts = getAllPosts().sort(
      (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
    );
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Erro ao ler posts:', error);
    return NextResponse.json({ error: 'Erro ao carregar artigos' }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Método não permitido' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Método não permitido' }, { status: 405 });
}
