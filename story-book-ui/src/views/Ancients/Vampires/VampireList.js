import React from 'react';
import { useTranslation } from 'react-i18next';

const VampireList = props => {
console.log("🚀 ~ file: VampireList.js ~ line 5 ~ props", props)

  const { t: translate } = useTranslation();

  return (
    <h1>{translate('resources.ancients.vampires.name')}</h1>
  )
};

export default VampireList;