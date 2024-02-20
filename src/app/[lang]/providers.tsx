import AuthProvider from '@/src/components/provider/auth-provider';
import { Toaster } from '@/src/components/ui/toaster';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
