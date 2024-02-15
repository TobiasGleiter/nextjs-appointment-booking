import { AppointmentForm } from '@/src/components/form/appointment-form';
import NavigationLink from '@/src/components/navigation/link-navigation';
import { buttonVariants } from '@/src/components/ui/button';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { cn } from '@/src/lib/utils';
import { Suspense } from 'react';

export default async function BookNowPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page, button, error } = await getDictionary(lang);

  return (
    <div className="grid w-full gap-10 justify-between">
      <div className="flex w-full items-start justify-between">
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
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">{page.bookNow.headline}</h1>
        <Suspense>
          <AppointmentForm
            sections={page.bookNow.sections}
            buttonBookNow={button.bookNow}
            error={error}
            lang={lang}
          />
        </Suspense>
      </div>
    </div>
  );
}
