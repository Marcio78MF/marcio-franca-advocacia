import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(req: NextRequest) {
  try {
    ensureBlogDir();
    const body = await req.json();
    const {
      titulo,
      slug,
      oldSlug,
      resumo,
      categoria,
      publicado,
      conteudo,
      criadoEm,
    } = body;

    if (!titulo || !slug || !resumo || !conteudo || !categoria) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const dataCriacao = criadoEm || new Date().toISOString().split('T')[0];

    // Formata o frontmatter e o conteúdo
    const fileContent = [
      '---',
      `titulo: "${titulo.replace(/"/g, '\\"')}"`,
      `slug: ${cleanSlug}`,
      `resumo: "${resumo.replace(/"/g, '\\"')}"`,
      `categoria: "${categoria}"`,
      `publicado: ${publicado ? 'true' : 'false'}`,
      `criadoEm: "${dataCriacao}"`,
      '---',
      '',
      conteudo.trim(),
      '',
    ].join('\n');

    // Se mudou de slug, exclui o arquivo anterior
    if (oldSlug && oldSlug !== cleanSlug) {
      const oldPath = path.join(BLOG_DIR, `${oldSlug}.md`);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const newPath = path.join(BLOG_DIR, `${cleanSlug}.md`);
    fs.writeFileSync(newPath, fileContent, 'utf-8');

    return NextResponse.json({
      success: true,
      post: {
        titulo,
        slug: cleanSlug,
        resumo,
        categoria,
        publicado,
        conteudo,
        criadoEm: dataCriacao,
      },
    });
  } catch (error) {
    console.error('Erro ao salvar post:', error);
    return NextResponse.json({ error: 'Erro ao salvar artigo' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    ensureBlogDir();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug não informado' }, { status: 400 });
    }

    const filePath = path.join(BLOG_DIR, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    return NextResponse.json({ error: 'Erro ao deletar artigo' }, { status: 500 });
  }
}
