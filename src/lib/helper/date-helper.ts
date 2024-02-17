import { Locale } from '../lang/i18.config';

export function getUTCDate(date: Date): Date {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}

/**
 * Format date to make it readable for humans
 * @param date
 * @param lang
 * @return formatted date
 */
export function formatDateForHumans(date: Date, lang: Locale): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  };
  return date.toLocaleDateString(lang, options);
}
