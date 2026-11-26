import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  output: 'standalone',
};

export default withNextIntl(nextConfig);
