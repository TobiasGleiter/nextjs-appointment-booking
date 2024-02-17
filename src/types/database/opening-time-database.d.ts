export type TimeSlots = {
  time: string;
  label: string;
};

export type OpeningTime = {
  open: boolean;
  day: number;
  timeSlots: TimeSlots[];
};
