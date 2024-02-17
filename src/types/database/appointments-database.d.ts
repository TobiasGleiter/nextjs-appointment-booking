import { ObjectId } from 'mongodb';

export type Appointment = {
  _id?: ObjectId;
  appointmentDate: Date;
  clientEmail: string;
  clientName: string;
  sellerId: ObjectId;
  sellerName?: string;
  bookedAt: Date;
  clientNotes?: string;
};
