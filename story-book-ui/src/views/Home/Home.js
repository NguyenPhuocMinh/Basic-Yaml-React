import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Home = props => {

  const { t: translate } = useTranslation();
  const history = useHistory();

  return (
    <Button
      variant="contained"
      onClick={() => history.push('/vampires')}
    >
      hello
    </Button>
  )
};

export default Home;