import { useTranslation } from 'next-i18next';
import { TranslationKeys } from 'src/generated/translationKeys';

interface DateTranslationType {
  time?: Date;
  date?: Date;
}

export const useTypeSafeTranslation = (key = '') => {
  const { t } = useTranslation(key);

  return {
    t: (s: TranslationKeys, f?: DateTranslationType) => t(s, f),
  };
};
