import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { adminPaths, employeePaths, protectedPaths } from '@/src/config/auth';
import { JWT, getToken } from 'next-auth/jwt';
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

// Middleware function to check if the user has the required role
function hasRole(token: JWT, role) {
  // Assuming the user's role is stored in the request object
  const userRole = token.role; // Adjust this based on how user role is stored

  return userRole === role;
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
      let signInUrl = new URL('/login', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    const adminPathsWithLocale = getProtectedRoutes(adminPaths, [
      ...i18n.locales,
    ]);

    const isAdminRoute = adminPathsWithLocale.includes(pathname);
    const isEmployeeRoute = employeePaths.includes(pathname);

    // is employee but not admin
    if (isAdminRoute && !hasRole(token, 'admin')) {
      let redirectUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // is not an employee
    if (isEmployeeRoute && !hasRole(token, 'seller')) {
      const redirectUrl = new URL('/', request.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }

    return middleware(request, event, response);
  };
}
