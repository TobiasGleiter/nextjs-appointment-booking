import AuthProvider from '@/src/components/provider/auth-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
