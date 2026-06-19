import fs from 'fs';
import path from 'path';

export type Post = {
  id: string;
  titulo: string;
  slug: string;
  resumo: string;
  categoria: string;
  publicado: boolean;
  criadoEm: string;
  conteudo: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function parseFrontmatter(fileContent: string): { data: Record<string, string>; content: string } {
  const parts = fileContent.split('---');
  if (parts.length < 3) {
    return { data: {}, content: fileContent };
  }

  const frontmatterRaw = parts[1].trim();
  const data: Record<string, string> = {};

  for (const line of frontmatterRaw.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  const content = parts.slice(2).join('---').trim();
  return { data, content };
}

function fileToPost(filename: string, index: number): Post {
  const filePath = path.join(BLOG_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = parseFrontmatter(fileContent);

  return {
    id: String(index + 1),
    titulo: data.titulo || '',
    slug: data.slug || filename.replace(/\.md$/, ''),
    resumo: data.resumo || '',
    categoria: data.categoria || '',
    publicado: data.publicado === 'true',
    criadoEm: data.criadoEm || '',
    conteudo: content,
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  const posts = files.map((f, i) => fileToPost(f, i));

  return posts
    .filter(p => p.publicado)
    .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getPosts();
  return posts.find(p => p.slug === slug);
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  return files.map((f, i) => fileToPost(f, i));
}
