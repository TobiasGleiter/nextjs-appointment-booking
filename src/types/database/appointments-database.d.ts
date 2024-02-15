import { ObjectId } from 'mongodb';

export type Appointment = {
  _id?: ObjectId;
  appointmentDate: Date;
  clientEmail: string;
  clientName: string;
  sellerId: ObjectId;
  bookedAt: Date;
  clientNotes?: string;
};
