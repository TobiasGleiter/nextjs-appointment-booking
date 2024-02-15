import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    // NODE
    NODE_ENV: z.enum(['development', 'test', 'production']),

    // // This is optional because it's only used in development.
    // // See https://next-auth.js.org/deployment.
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(32),

    GOOGLE_CLIENT_ID: z.string().min(32),
    GOOGLE_CLIENT_SECRET: z.string().min(32),

    // MongoDb
    MONGODB_URI: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  },
  runtimeEnv: {
    // NODE
    NODE_ENV: process.env.NODE_ENV,

    // AUTH
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    // MongoDb
    MONGODB_URI: process.env.MONGODB_URI,
  },
});
