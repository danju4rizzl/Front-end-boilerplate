import * as React from 'react';

import { useTypeSafeTranslation } from '@hooks/useTypeSafeTranslation';

import * as styles from './HelloWorld.css';

interface Props {}

const HelloWorld: React.FC<Props> = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <div className={styles.root}>
      <h1>🧁 Hello from vanilla-extract!</h1>
      <p>{t('profile')}</p>
    </div>
  );
};

export default HelloWorld;
