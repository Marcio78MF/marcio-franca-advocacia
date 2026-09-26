import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const ADMIN_EMAIL = 'marciosantosfranca@gmail.com';

export default async function AdminPage() {
  const session = await auth();

  if (session?.user?.email?.toLowerCase() === ADMIN_EMAIL) {
    redirect('/admin/dashboard');
  }

  redirect('/admin/login');
}
