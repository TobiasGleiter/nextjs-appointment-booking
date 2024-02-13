'use client';

import { SessionProvider } from 'next-auth/react';

export interface IAuthProvider {
  children: React.ReactNode;
}

// this is only neccessary for the "use client" pages/components when need to access the session with useSession()
export default function AuthProvider({ children }: IAuthProvider) {
  return <SessionProvider>{children}</SessionProvider>;
}
