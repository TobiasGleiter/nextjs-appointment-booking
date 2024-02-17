import { ObjectId } from 'mongodb';

export type TimeSlots = {
  time: string;
  label: string;
};

export type OpeningTime = {
  _id?: ObjectId;
  open: boolean;
  day: number;
  timeSlots: TimeSlots[];
};
