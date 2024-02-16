import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import {
  checkIfBusinessIsOpenOnWeekday,
  checkIfSellerIsAvailable,
} from '../helper/appointments-helper';
import { routeRequestPostAppointmentSchema } from '../validation/appointment/route-appointment';
import { AbstractHandler } from './handler';

/**
 * Check if the data fits the expected schema, if not return 'Forbidden'
 * @returns NextResponse | null
 */
export class VerifyAppointmentSchemaHandler extends AbstractHandler {
  public async handle(data: any): Promise<NextResponse | null> {
    const parsedAppointment = routeRequestPostAppointmentSchema.parse(data);
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
export class VerifyBusinessIsOpenOnWeekdayHandler extends AbstractHandler {
  public async handle(data: any): Promise<NextResponse | null> {
    const appointmentDate = new Date(data.appointmentDate);
    const isBusinessOpen = await checkIfBusinessIsOpenOnWeekday(
      appointmentDate
    );
    if (!isBusinessOpen) {
      return NextResponse.json('Forbidden', { status: 404 });
    }
    return super.handle(data);
  }
}

/**
 * Check if the resuqestes appointment is inbetween the opening hours, if not return 'Forbidden'
 * @returns NextResponse | null
 */
export class VerifyAppointmentIsBetweenOpeningHoursHandler extends AbstractHandler {
  public async handle(data: any): Promise<NextResponse | null> {
    const appointmentDate = new Date(data.appointmentDate);
    console.log(appointmentDate);
    const isBusinessOpen = true;
    if (!isBusinessOpen) {
      return NextResponse.json('Forbidden', { status: 404 });
    }
    return super.handle(data);
  }
}

/**
 * Check if the requested date is at the opening days, if not return 'Forbidden'
 * @returns NextResponse | null
 */
export class VerifySellerIsAvailableHandler extends AbstractHandler {
  public async handle(data: any): Promise<NextResponse | null> {
    const appointmentDate = new Date(data.appointmentDate);
    const isSellerAvailable = await checkIfSellerIsAvailable(
      appointmentDate,
      new ObjectId(data.sellerId)
    );
    if (!isSellerAvailable) {
      return NextResponse.json('Forbidden', { status: 404 });
    }

    return super.handle(data);
  }
}