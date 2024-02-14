import { ObjectId } from 'mongodb';

export type Appointment = {
  _id?: ObjectId;
  bookedAt: Date;
  clientEmail: string;
  clientName: string;
  clientNotes: string;
  sellerId: ObjectId;
};
