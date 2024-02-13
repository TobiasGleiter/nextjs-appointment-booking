import { env } from '@/env.mjs';
import { NextAuthOptions } from 'next-auth';
import { providers } from './providers-auth';

let mongodb_name: string = env.MONGODB_NAME_DEV ?? '';
if (env.NODE_ENV !== 'development') {
  mongodb_name = env.MONGODB_NAME_PROD;
}

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: providers,
  pages: {
    //signIn: '/login', // problem with locale! Where do I get the locale from?
    //signOut: "/logout",
    //error: '/error', // Error code passed in query string as ?error=
    //newUser: "/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
};
