// import GithubProvider from 'next-auth/providers/github';
import { env } from '@/env.mjs';
import GoogleProvider from 'next-auth/providers/google';

export const providers = [
  GoogleProvider({
    profile(profile) {
      return {
        id: profile.sub.toString(),
        name: profile.name,
        image: profile.picture,
        email: profile.email,
        location: profile.locale,
        emailVerified: profile.emailVerified,

        role: 'customer',
        createdAt: Date.now(),
      };
    },
    clientId: env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: env.GOOGLE_CLIENT_SECRET ?? '',
  }),
];
