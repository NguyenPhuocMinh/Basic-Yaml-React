import React, { useEffect, useState } from 'react';
// material ui
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
// hooks
import { useTranslate } from '../hooks';
// styles
import { makeStyles } from '@mui/styles';
// redux
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  selected: {
    color: `${theme.palette.text.primary} !important`,
    borderColor: `${theme.palette.text.primary} !important`
  },
  rootIcon: {
    marginRight: '8px'
  }
}))

const ButtonGroupHelper = ({ changeTheme }) => {
  // hooks
  const dispatch = useDispatch();
  const translate = useTranslate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  // func
  const handleChange = (event, newTheme) => {
    if (newTheme !== null) {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme)
    }
  };
  // render
  useEffect(() => {
    dispatch(changeTheme(theme))
  }, [theme, dispatch, changeTheme]);

  const classes = useStyles({ theme });

  return (
    <ToggleButtonGroup
      color="primary"
      value={theme}
      exclusive
      onChange={handleChange}
      fullWidth
    >
      <ToggleButton
        sx={{
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 700,
          justifyContent: 'center',
        }}
        classes={{
          selected: classes.selected
        }}
        value="light"
      >
        <WbSunnyIcon className={classes.rootIcon} />
        <Typography variant="inherit">
          {translate('appBar.toolbar.setting.themes.light')}
        </Typography>
      </ToggleButton>
      <ToggleButton
        sx={{
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 700,
          justifyContent: 'center',
        }}
        value="dark"
        classes={{
          selected: classes.selected
        }}
      >
        <NightsStayIcon className={classes.rootIcon} />
        <Typography variant="inherit">
          {translate('appBar.toolbar.setting.themes.dark')}
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ButtonGroupHelper;