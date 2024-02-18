import NavigationLink from '@/src/components/navigation/link-navigation';
import { buttonVariants } from '@/src/components/ui/button';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { cn } from '@/src/lib/utils';

interface EditorProps {
  children?: React.ReactNode;
  params: { lang: Locale };
}

export default async function EditorLayout({
  children,
  params: { lang },
}: EditorProps) {
  const { page, button } = await getDictionary(lang);

  return (
    <div className="flex flex-col gap-10 justify-between">
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-row items-center gap-2">
          <NavigationLink
            lang={lang}
            path={'/dashboard/opening-time'}
            className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
          >
            {button.back}
          </NavigationLink>
        </div>
      </div>
      <div className="flex flex-col w-fit gap-2">
        <h1 className="text-xl font-bold">{page.bookNow.headline}</h1>
        {children}
      </div>
    </div>
  );
}
