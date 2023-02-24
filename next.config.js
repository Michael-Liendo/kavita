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
};

module.exports = nextConfig;
