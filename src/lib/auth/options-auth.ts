import { env } from '@/env.mjs';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { NextAuthOptions } from 'next-auth';
import clientPromise from '../database/mongodb-database';
import { providers } from './providers-auth';

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: env.NODE_ENV,
  }),
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
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as string;

      return session;
    },
  },
};
