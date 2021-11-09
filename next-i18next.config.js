const path = require('path');

module.exports = {
  debug: false,
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    localePath: path.resolve('./public/locales'),
    localeDetection: false,
  },
  serializeConfig: false,
};
