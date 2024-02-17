import 'next-auth';

// Extend the existing Session type with the 'id' property
declare module 'next-auth' {
  interface Session {
    user: User;
    expires: string;
    access_token?: string;
    error?: string;
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {}
}
