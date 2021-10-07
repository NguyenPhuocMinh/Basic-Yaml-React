import React, { useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
// action
import { languageActions } from '../store/actions';
// material ui
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
// country flag
import ReactCountryFlag from 'react-country-flag';
// i18n
import { useTranslation } from 'react-i18next';
import { languages } from './utils';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  selected: {
    background: 'red !important'
  },
})

const PopupHelper = ({ open, anchorEl, handleClose }) => {
  // hooks
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  // states
  const [selectedIndex, setSelectedIndex] = useState(localStorage.getItem('selectedIndex'));
  // func
  const handleChangeLanguage = (language, index) => {
    localStorage.setItem('selectedIndex', index);
    localStorage.setItem('language', language);
    setSelectedIndex(index);
    window.location.reload();
    dispatch(languageActions.changeLanguages(language));
  };

  console.log("🚀 ~ file: PopupHelper.js ~ line 31 ~ PopupHelper ~ selectedIndex", selectedIndex)

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 3,
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {languages.map((item, index) => {
        console.log("🚀 ~ file: PopupHelper.js ~ line 79 ~ {languages.map ~ index", index)
        console.log("🚀 ~ file: PopupHelper.js ~ line 84 ~ {languages.map ~ index === selectedIndex", index === selectedIndex)

        return (
          <MenuItem
            key={index}
            onClick={() => handleChangeLanguage(item.name, index)}
            selected={index === selectedIndex}
            classes={{
              selected: classes.selected
            }}
          >
            <ListItemIcon>
              <ReactCountryFlag
                svg
                countryCode={item.countryCode}
                style={{
                  fontSize: '1.25rem',
                  width: '1em',
                  height: '1em',
                }}
              />
            </ListItemIcon>
            <Typography variant='caption'>
              {translate(`appBar.toolbar.language.${item.name}`)}
            </Typography>
          </MenuItem>
        )
      })}
    </Menu>
  )
};

export default PopupHelper;