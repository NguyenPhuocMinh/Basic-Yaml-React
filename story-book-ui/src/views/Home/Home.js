import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = props => {

  const { t: translate } = useTranslation();

  return (
    <h1>{translate('resources.home.title')}</h1>
  )
};

export default Home;