import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
// country flag
import ReactCountryFlag from 'react-country-flag';
// i18n
import { useTranslation } from 'react-i18next';

const PopupHelper = ({ open, anchorEl, handleClose }) => {
  // translate
  const { t: translate } = useTranslation();

  const handleChangeLanguage = (language) => {
    localStorage.setItem('language', language);
    window.location.reload();
  };

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
      <MenuItem
        onClick={() => handleChangeLanguage('en')}
      >
        <ListItemIcon>
          <ReactCountryFlag
            svg
            countryCode='US'
            style={{
              fontSize: '1.25rem',
              width: '1em',
              height: '1em',
            }}
          />
        </ListItemIcon>
        <Typography variant='caption'>
          {translate('appBar.toolbar.language.en')}
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={() => handleChangeLanguage('vn')}
      >
        <ListItemIcon>
          <ReactCountryFlag
            svg
            countryCode='VN'
            style={{
              fontSize: '1.25rem',
              width: '1em',
              height: '1em',
            }}
          />
        </ListItemIcon>
        <Typography variant='caption'>
          {translate('appBar.toolbar.language.vn')}
        </Typography>
      </MenuItem>
    </Menu>
  )
};

export default PopupHelper;