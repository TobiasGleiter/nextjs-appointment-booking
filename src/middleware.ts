import { withAuthMiddleware } from './lib/middleware/auth-middleware';
import { chain } from './lib/middleware/chain-middleware';
import { withI18nMiddleware } from './lib/middleware/locale-middleware';

export default chain([withI18nMiddleware, withAuthMiddleware]);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|static/).*)',
  ],
};
