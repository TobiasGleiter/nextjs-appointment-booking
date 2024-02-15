import { NextResponse } from 'next/server';
import { checkIfBusinessIsOpen } from '../helper/appointments-helper';
import { routeRequestPostAppointmentSchema } from '../validation/appointment/route-appointment';
import { AbstractHandler } from './handler';

/**
 * Check if the data fits the expected schema, if not return 'Forbidden'
 * @returns NextResponse | null
 */
export class VerifyAppointmentSchemaHandler extends AbstractHandler {
  public async handle(data: any): Promise<NextResponse | null> {
    const parsedAppointment = routeRequestPostAppointmentSchema.parse(data);
    console.log('VerifyAppointmentSchemaHandler');
    if (!parsedAppointment) {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    return super.handle(parsedAppointment);
  }
}

/**
 * Check if the requested date is at the opening days, if not return 'Forbidden'
 * @returns NextResponse | null
 */
export class VerifyBusinessIsOpenHandler extends AbstractHandler {
  public async handle(data: any): Promise<NextResponse | null> {
    console.log('VerifyBusinessIsOpenHandler');
    const appointmentDate = new Date(data.appointmentDate);
    const isOpen = checkIfBusinessIsOpen(appointmentDate);
    if (!isOpen) {
      return NextResponse.json('Forbidden', { status: 404 });
    }
    return super.handle(data);
  }
}
