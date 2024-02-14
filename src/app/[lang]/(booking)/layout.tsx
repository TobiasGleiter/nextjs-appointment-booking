import NavigationLink from '@/src/components/navigation/link-navigation';
import { buttonVariants } from '@/src/components/ui/button';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { cn } from '@/src/lib/utils';

interface BookNowLayoutProps {
  children: React.ReactNode;
  params: { lang: Locale };
}

export default async function BookNowLayout({
  children,
  params: { lang },
}: BookNowLayoutProps) {
  const { button } = await getDictionary(lang);
  return (
    <div className=" flex min-h-screen flex-col py-8">
      <div className="grid w-full gap-10">
        <div className="container flex w-full items-start justify-between">
          <div className="flex flex-row items-center gap-2">
            <NavigationLink
              lang={'en'}
              path={'/'}
              className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
            >
              {button.cancel}
            </NavigationLink>
          </div>
        </div>
        <main className="flex w-full items-center min-h-screen flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
