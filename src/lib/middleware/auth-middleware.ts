import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { protectedPaths } from '@/src/config/auth';
import { getToken } from 'next-auth/jwt';
import { Locale, i18n } from '../lang/i18.config';
import { CustomMiddleware } from './chain-middleware';

function getProtectedRoutes(protectedPaths: string[], locales: Locale[]) {
  let protectedPathsWithLocale = [...protectedPaths];

  protectedPaths.forEach((route) => {
    locales.forEach(
      (locale) =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`,
        ])
    );
  });

  return protectedPathsWithLocale;
}

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next();

    const token = await getToken({ req: request });

    // @ts-ignore
    request.nextauth = request.nextauth || {};
    // @ts-ignore
    request.nextauth.token = token;
    const pathname = request.nextUrl.pathname;

    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...i18n.locales,
    ]);

    if (
      !token &&
      protectedPathsWithLocale.some((path) => pathname.includes(path))
    ) {
      const signInUrl = new URL('/login', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    console.log(token);

    return middleware(request, event, response);
  };
}
