/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localeDetection: false,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'placeimg.com' }],
  },
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  },
};

module.exports = nextConfig;
