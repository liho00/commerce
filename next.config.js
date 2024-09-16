const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  },
  experimental: {
    turbo: {
      resolveAlias: {
        'next/server.js': 'next/server',
        'next/navigation.js': 'next/navigation',
        'next/headers.js': 'next/headers',
      },
    },
  },
};

module.exports = withNextIntl(nextConfig);
