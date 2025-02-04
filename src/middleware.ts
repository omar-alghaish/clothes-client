// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   locales: ["en", "ar"],
//   defaultLocale: "en",
// });

// export const config = {
//   matcher: ["/", "/(en|ar)/:path*"],
// };


// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always', // Force locale prefix for all routes
  localeDetection: false // Disable automatic locale detection
});

export const config = {
  matcher: [
    // Match all paths except:
    '/((?!api|_next|_vercel|favicon.ico|.*\\..*).*)'
  ]
};