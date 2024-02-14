import NavigationLink from '@/src/components/navigation/link-navigation';

export default function BookNowLayout({ children }) {
  return (
    <div className=" flex min-h-screen flex-col py-8">
      <div className="grid w-full gap-10">
        <div className="container flex w-full items-start justify-between">
          <div className="flex flex-row items-center gap-2">
            <NavigationLink lang={'en'} path={'/'}>
              Back
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
