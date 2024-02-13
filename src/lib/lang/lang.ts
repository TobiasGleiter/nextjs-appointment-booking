import 'server-only';
import { Locale } from './i18.config';

const dictionaries = {
  en: () => import('@/src/lang/en.json').then((module) => module.default),
};

/**
 * Method to get the dictionary for the given locale
 * @param locale
 * @returns json language dictionary
 */
export const getDictionary = async (locale: Locale) => dictionaries[locale]();

/**
 * Changes the locale on the serverside and refreshes the page
 * @param locale
 * @param pathName
 * @param router
 */
export const changeLocaleServer = async (
  locale: string,
  pathName: string,
  router: any
) => {
  if (!pathName) return '/';
  const segments = pathName.split('/');
  segments[1] = locale;
  const newPath = segments.join('/');

  router.push(newPath);
};
