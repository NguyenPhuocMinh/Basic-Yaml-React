import React from 'react';
import { useTranslation } from 'react-i18next';

const VampireCreate = props => {

  const { t: translate } = useTranslation();

  return (
    <h1>{translate('resources.vampire.title')}</h1>
  )
};

export default VampireCreate;