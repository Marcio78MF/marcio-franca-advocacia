import { NextRequest, NextResponse } from 'next/server';

const leads: Array<{ id: string; nome: string; telefone: string; area: string; respostas: Record<string, string>; criadoEm: string }> = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, telefone, area, respostas } = body;
    if (!nome || !telefone || !area) return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    const lead = { id: crypto.randomUUID(), nome: nome.trim(), telefone: telefone.trim(), area, respostas: respostas || {}, criadoEm: new Date().toISOString() };
    leads.push(lead);
    return NextResponse.json({ success: true, id: lead.id });
  } catch { return NextResponse.json({ error: 'Erro interno' }, { status: 500 }); }
}

export async function GET() {
  return NextResponse.json({ leads, total: leads.length });
}
