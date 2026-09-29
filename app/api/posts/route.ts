import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAllPosts } from '@/lib/blog';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Garante que o diretório do blog exista
function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

export async function GET() {
  try {
    ensureBlogDir();
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
