import { ObjectId } from 'mongodb';

export type Appointment = {
  _id?: ObjectId;
  bookedAt: string;
  clientEmail: string;
  clientName: string;
  clientNotes: string;
  sellerId: ObjectId;
};
