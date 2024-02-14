import { authOptions } from '@/src/lib/auth/options-auth';
import { getServerSession } from 'next-auth';

export default async function BookNowPage() {
  const session = await getServerSession(authOptions);

  return <div>BookNowPage</div>;
}
