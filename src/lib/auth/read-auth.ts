import { Session, User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './options-auth';

/**
 * Returns the user from getServerSession(authOptions)
 * @returns user
 */
export async function readCurrentUser(): Promise<User> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }
  return session?.user;
}

/**
 * Retruns the session from getServerSession(authOptions)
 * @returns user
 */
export async function readCurrentSession(): Promise<null | Session> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }
  return session;
}
