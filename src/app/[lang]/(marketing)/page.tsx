import { buttonVariants } from '@/src/components/ui/button';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page, button } = await getDictionary(lang);

  return (
    <>
      <section
        id="hero"
        className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 mb-20 sm:mb-0"
      >
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {page.home.headline}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {page.home.description}
          </p>
          <ol className="text-lg font-bold underline">
            <li>Best customer service</li>
            <li>We are good because we are fast.</li>
            <li>No worry, we go you!</li>
          </ol>
          <div>
            <Link
              href={'/en/book-now'}
              className={cn(buttonVariants({ size: 'sm' }), 'px-4')}
            >
              {button.bookNow}
            </Link>
          </div>
        </div>
      </section>
      <section
        id="open-hours"
        className={cn(
          'relative container gap-6 py-8 md:py-12 lg:py-24',
          'min-h-[400px]'
        )}
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <div className="flex gap-2 items-center">
            <h2 className="font-heading font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              {page.home.sections.openingHours.headline}
            </h2>
          </div>
          <p className="max-w-[85%] leading-normal text-muted-background dark:text-muted-foreground sm:text-lg sm:leading-7">
            {page.home.sections.openingHours.description}
          </p>
        </div>
      </section>
      <section
        id="about"
        className={cn(
          'relative container gap-6 py-8 md:py-12 lg:py-24',
          'min-h-[400px]'
        )}
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <div className="flex gap-2 items-center">
            <h2 className="font-heading font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              {page.home.sections.about.headline}
            </h2>
          </div>
          <p className="max-w-[85%] leading-normal text-muted-background dark:text-muted-foreground sm:text-lg sm:leading-7">
            {page.home.sections.about.description}
          </p>
        </div>
      </section>
    </>
  );
}
