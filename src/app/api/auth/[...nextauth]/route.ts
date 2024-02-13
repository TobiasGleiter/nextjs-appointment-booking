import { authOptions } from '@/src/lib/auth/options-auth';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
