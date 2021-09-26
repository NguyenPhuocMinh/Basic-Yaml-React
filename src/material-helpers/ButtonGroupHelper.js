import React, { useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Typography from '@mui/material/Typography';
// i18n
import { useTranslation } from 'react-i18next';
// styles
import { makeStyles } from '@mui/styles';
// redux
import { useDispatch } from 'react-redux';
import { themeActions } from '../store/actions';

const useStyles = makeStyles({
  selected: {
    borderColor: 'rgb(0, 127, 255) !important'
  },
  rootIcon: {
    marginRight: '8px'
  }
})

const ButtonGroupHelper = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Translate
  const { t: translate } = useTranslation();
  const [theme, setTheme] = useState('light');

  const handleChange = (event, newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    dispatch(themeActions.changeThemes(theme))
  }, [theme, dispatch]);

  console.log("🚀 ~ file: ButtonGroupHelper.js ~ line 26 ~ ButtonGroupHelper ~ theme", theme)

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
          border: '1px solid rgb(229, 232, 236)',
          color: 'rgb(70, 80, 90)',
          justifyContent: 'center',
        }}
        classes={{
          selected: classes.selected
        }}
        value="light"
        fullWidth
      >
        <WbSunnyIcon color="inherit" className={classes.rootIcon} />
        <Typography variant="inherit">
          {translate('appBar.toolbar.setting.themes.light')}
        </Typography>
      </ToggleButton>
      <ToggleButton
        sx={{
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 700,
          border: '1px solid rgb(229, 232, 236)',
          color: 'rgb(70, 80, 90)',
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