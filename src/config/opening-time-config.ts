export const openingTime = {
  timeSlots: [
    { value: '1970-01-01T10:00:00.000Z', label: '10:00' },
    { value: '1970-01-01T10:30:00.000Z', label: '10:30' },
    { value: '1970-01-01T11:00:00.000Z', label: '11:00' },
    { value: '1970-01-01T12:00:00.000Z', label: '12:00' },
    { value: '1970-01-01T13:00:00.000Z', label: '13:00' },
    { value: '1970-01-01T14:00:00.000Z', label: '14:00' },
  ],
  openHours: {
    sunday: {
      open: false,
      start: 'T12:00:00.000Z',
      end: 'T19:00:00.000Z',
    },
    monday: {
      open: true,
      start: 'T12:00:00.000Z',
      end: 'T19:00:00.000Z',
    },
    tuesday: {
      open: true,
      start: 'T10:00:00.000Z',
      end: 'T19:00:00.000Z',
    },
    wednesday: {
      open: true,
      start: 'T10:00:00.000Z',
      end: 'T19:00:00.000Z',
    },
    thursday: {
      open: true,
      start: 'T10:00:00.000Z',
      end: 'T19:00:00.000Z',
    },
    friday: {
      open: true,
      start: 'T10:00:00.000Z',
      end: 'T19:00:00.000Z',
    },
    saturday: {
      open: true,
      start: 'T10:00:00.000Z',
      end: 'T16:00:00.000Z',
    },
  },
};
