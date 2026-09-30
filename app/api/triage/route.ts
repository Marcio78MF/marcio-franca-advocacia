import { NextRequest, NextResponse } from 'next/server';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

const SITUACOES = new Set([
  'Quero saber sobre BPC para pessoa idosa',
  'Quero saber sobre BPC para pessoa com deficiência',
  'Quero saber sobre BPC para pessoa com autismo (TEA)',
  'Meu pedido foi negado por renda',
  'Meu pedido foi negado após avaliação/perícia',
  'Meu BPC foi suspenso ou bloqueado',
  'Tenho dúvida sobre CadÚnico ou renda familiar',
  'Quero entender quem entra no grupo familiar',
  'Outro motivo',
]);

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function db() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase server credentials are not configured');
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }

  return getFirestore();
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin');
    if (origin && origin !== 'https://bpc.marciofranca.adv.br') {
      return NextResponse.json({ error: 'Origem não permitida' }, { status: 403 });
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Formato inválido' }, { status: 415 });
    }

    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > 10_000) {
      return NextResponse.json({ error: 'Requisição muito grande' }, { status: 413 });
    }

    const body = await req.json();
    const nome = clean(body.nome, 120);
    const telefone = clean(body.telefone, 30);
    const situacao = clean(body.situacao, 180);

    const telefoneDigitos = telefone.replace(/\D/g, '');

    if (
      !nome ||
      !telefone ||
      telefoneDigitos.length < 10 ||
      telefoneDigitos.length > 13 ||
      !SITUACOES.has(situacao)
    ) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    // Honeypot: bots commonly fill hidden fields.
    if (clean(body.website, 200)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const doc = await db().collection('leads').add({
      nome,
      telefone,
      area: 'BPC/LOAS',
      situacao,
      source: 'bpc-landing',
      cta: 'lead_form',
      pagina: 'https://bpc.marciofranca.adv.br/',
      status: 'novo',
      criadoEm: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, id: doc.id }, { status: 201 });
  } catch (error) {
    console.error('Falha ao registrar lead BPC:', error instanceof Error ? error.message : 'erro desconhecido');
    return NextResponse.json({ error: 'Não foi possível registrar o contato' }, { status: 500 });
  }
}

// Leads contêm dados pessoais e não são expostos por endpoint público.
export async function GET() {
  return NextResponse.json({ error: 'Método não permitido' }, { status: 405 });
}
