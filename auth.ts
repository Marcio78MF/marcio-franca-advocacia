import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const ADMIN_EMAIL = 'marciosantosfranca@gmail.com';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  callbacks: {
    signIn({ user, account }) {
      return account?.provider === 'google' &&
        user.email?.toLowerCase() === ADMIN_EMAIL;
    },
    authorized({ auth, request }) {
      const email = auth?.user?.email?.toLowerCase();
      const isAdmin = email === ADMIN_EMAIL;
      const { pathname } = request.nextUrl;

      if (pathname.startsWith('/api/admin/')) return isAdmin;

      if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        return isAdmin;
      }

      return true;
    },
  },
});
