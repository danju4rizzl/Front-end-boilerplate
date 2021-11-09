const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  experimental: {
    scrollRestoration: true,
    externalDir: true,
    esmExternals: false,
  },
  images: {
    domains: [],
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: './bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html',
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    });
    config.optimization.minimize = true;
    return config;
  },
};

module.exports = withPlugins(
  [[withBundleAnalyzer], [withVanillaExtract]],
  nextConfig,
);
