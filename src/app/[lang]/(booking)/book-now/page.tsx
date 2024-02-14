import { AppointmentForm } from '@/src/components/form/appointment-form';
import { Suspense } from 'react';

export default async function BookNowPage() {
  return (
    <div>
      <h1>BookNowPage</h1>
      <Suspense>
        <AppointmentForm />
      </Suspense>
    </div>
  );
}
