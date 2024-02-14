export class ParseAppointmentError extends Error {
  constructor(message = 'Input is not valid.') {
    super(message);
  }
}
