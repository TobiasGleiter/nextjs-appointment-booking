export type OpeningTimeSlots = {
  time: string;
  label: string;
};

export type OpeningTime = {
  open: boolean;
  day: number;
  start: string;
  end: string;
  timeSlots: OpeningTimeSlots[];
};
