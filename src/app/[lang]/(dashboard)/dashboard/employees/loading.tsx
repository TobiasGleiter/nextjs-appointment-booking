import { Icons } from '@/src/components/base/icons';

export default function Loading() {
  return (
    <div className="flex w-full h-full min-h-screen items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <Icons.spinner className="animate-spin" />
      </div>
    </div>
  );
}
