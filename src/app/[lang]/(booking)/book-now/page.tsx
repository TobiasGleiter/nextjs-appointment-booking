import { AppointmentForm } from '@/src/components/form/appointment-form';
import { Suspense } from 'react';

export default async function BookNowPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold">BookNowPage</h1>
      <Suspense>
        <AppointmentForm />
      </Suspense>
    </div>
  );
}
