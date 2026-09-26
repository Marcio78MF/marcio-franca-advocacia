import { NextRequest, NextResponse } from 'next/server';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { auth } from '@/auth';

export const runtime = 'nodejs';

const ADMIN_EMAIL = 'marciosantosfranca@gmail.com';
const STATUS = new Set(['novo', 'em_contato', 'agendado', 'cliente', 'encerrado']);

function db() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase server credentials are not configured');
  }

  if (!getApps().length) {
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }

  return getFirestore();
}

async function isAdmin() {
  const session = await auth();
  return session?.user?.email?.toLowerCase() === ADMIN_EMAIL;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const snapshot = await db().collection('leads').orderBy('criadoEm', 'desc').limit(200).get();
    const leads = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nome: data.nome ?? '',
        telefone: data.telefone ?? '',
        area: data.area ?? '',
        situacao: data.situacao ?? '',
        source: data.source ?? '',
        status: data.status ?? 'novo',
        criadoEm: data.criadoEm?.toDate?.().toISOString() ?? null,
      };
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Falha ao listar leads:', error instanceof Error ? error.message : 'erro desconhecido');
    return NextResponse.json({ error: 'Não foi possível carregar os leads' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = typeof body.id === 'string' ? body.id.trim() : '';
    const status = typeof body.status === 'string' ? body.status.trim() : '';

    if (!id || !STATUS.has(status)) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const ref = db().collection('leads').doc(id);
    const doc = await ref.get();
    if (!doc.exists) {
      return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 });
    }

    await ref.update({ status, atualizadoEm: FieldValue.serverTimestamp() });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Falha ao atualizar lead:', error instanceof Error ? error.message : 'erro desconhecido');
    return NextResponse.json({ error: 'Não foi possível atualizar o lead' }, { status: 500 });
  }
}
