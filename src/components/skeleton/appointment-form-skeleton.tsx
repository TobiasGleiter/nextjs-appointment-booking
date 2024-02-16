import { cn } from '@/src/lib/utils';
import { Skeleton } from '../ui/skeleton';

export default function AppointmentFormSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className={cn('h-[14px] w-[110px] px-4 py-2')} />
      <Skeleton
        className={cn(
          'h-[305px] w-[252px] px-4 py-2 flex items-center justify-center'
        )}
      />
    </div>
  );
}
