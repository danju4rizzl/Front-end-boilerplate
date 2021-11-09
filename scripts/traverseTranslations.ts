export const getTranslationKeys = (translations: TranslationRecord) => {
  const keys: string[] = [];

  const _traverseTranslations = (obj: TranslationRecord, path: string[]) => {
    Object.keys(obj).forEach((key) => {
      if (key.startsWith('_')) {
        return;
      }
      const objOrString = obj[key];
      if (typeof objOrString === 'string') {
        keys.push([...path, key].join('.'));
      } else {
        _traverseTranslations(objOrString, [...path, key]);
      }
    });
  };

  _traverseTranslations(translations, []);
  return keys;
};

type TranslationRecord = {
  [P in string]: string | TranslationRecord;
};
