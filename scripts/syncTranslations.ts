// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import * as fs from 'fs';
import { get, set } from 'lodash';
import { join } from 'path';
import prettier from 'prettier';

import config from '../.prettierrc.json';
import { getTranslationKeys } from './traverseTranslations';

const englishFiles = fs.readdirSync(join(__dirname, '../public/locales/en'));

fs.readdirSync(join(__dirname, '../public/locales')).forEach((locale) => {
  if (locale === 'en') {
    return;
  }

  const currentFiles = fs.readdirSync(
    join(__dirname, '../public/locales', locale),
  );

  englishFiles.forEach((englishFile) => {
    const data = fs.readFileSync(
      join(__dirname, '../public/locales/en', englishFile),
      { encoding: 'utf-8' },
    );
    const english = { ...JSON.parse(data) };
    const fileName = join(__dirname, '../public/locales', locale, englishFile);
    if (!currentFiles.includes(englishFile)) {
      fs.writeFileSync(fileName, data);
    } else {
      const data = {
        ...JSON.parse(fs.readFileSync(fileName, { encoding: 'utf-8' })),
      };
      const paths = [...getTranslationKeys(english)];
      paths.forEach((p) => {
        if (get(data, p, null) === null) {
          set(data, p, get(english, p));
        }
      });
      fs.writeFileSync(
        fileName,
        prettier.format(JSON.stringify(data), {
          parser: 'json',
          ...config,
          trailingComma: 'es5',
        }),
      );
    }
  });
});
