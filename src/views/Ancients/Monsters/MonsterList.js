import React from 'react';
import { useTranslation } from 'react-i18next';

const MonsterList = props => {
  const { name } = props;

  const { t: translate } = useTranslation();

  return (
    <h1>{translate(`resources.${name}.title`)}</h1>
  )
};

export default MonsterList;