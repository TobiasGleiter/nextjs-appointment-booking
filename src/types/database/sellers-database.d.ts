import { ObjectId } from 'mongodb';

export type Seller = {
  _id: ObjectId;
  name: string;
  email?: string;
  role?: string;
};
