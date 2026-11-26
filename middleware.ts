import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['tr'],
  defaultLocale: 'tr',
  localePrefix: 'never',
});

export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
