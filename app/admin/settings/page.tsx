import { redirect } from 'next/navigation';

export default function DisabledAdminModule() {
  redirect('/admin/dashboard');
}
