import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Locale } from './lang/i18.config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *
 * @param locale
 * @param path path to the page e.g. users/user1
 * @returns {string}
 */
export function constructPathWithLocale(locale: Locale, path?: string): string {
  const pathWithLocale = `/${locale}${path}`;
  return pathWithLocale;
}
