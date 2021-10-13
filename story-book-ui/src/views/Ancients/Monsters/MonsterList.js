import React from 'react';
import { useTranslation } from 'react-i18next';

const MonsterList = props => {

  const { t: translate } = useTranslation();

  return (
    <h1>{translate(`resources.ancients.monsters.name`)}</h1>
  )
};

export default MonsterList;