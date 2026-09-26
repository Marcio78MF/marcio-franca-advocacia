import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user?.email?.toLowerCase() === 'marciosantosfranca@gmail.com') {
    redirect('/admin');
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem', background: '#f6f7f8' }}>
      <section style={{ width: '100%', maxWidth: 420, padding: '2rem', background: '#fff', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,.08)', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '.75rem' }}>Área administrativa</h1>
        <p style={{ marginBottom: '1.5rem', color: '#5f6368' }}>
          Acesso restrito. Entre com a conta Google autorizada.
        </p>
        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/admin' });
          }}
        >
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Entrar com Google
          </button>
        </form>
      </section>
    </main>
  );
}
