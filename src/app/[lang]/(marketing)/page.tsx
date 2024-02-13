import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

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
        </div>
        <div></div>
      </section>
    </>
  );
}
