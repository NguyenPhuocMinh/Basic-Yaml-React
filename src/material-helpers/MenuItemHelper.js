import { forwardRef, useCallback } from 'react';
// redux
import { useSelector } from 'react-redux';
// material ui
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  ListItem,
  MenuItem
} from '@mui/material';
// router dom
import { NavLink, useLocation } from 'react-router-dom';
// i18n
import { useTranslation } from 'react-i18next';
import { DynamicMuiIcon } from '../common';

const NavLinkRef = forwardRef((props, ref) => {
  console.log("🚀 ~ file: MenuItemHelper.js ~ line 19 ~ NavLinkRef ~ ref", ref)
  console.log("🚀 ~ file: MenuItemHelper.js ~ line 19 ~ NavLinkRef ~ props", props)
  return (
    <NavLink innerRef={ref} {...props} />
  )
});

const MenuItemHelper = forwardRef((props, ref) => {
  const {
    iconName,
    name,
    path,
    onClick,
    ...rest
  } = props;

  // hooks
  const { t: translate } = useTranslation();
  const sidebarOpen = useSelector((state) => state.admin.ui.sidebarOpen);
  const location = useLocation();

  const selected = path === location.pathname;

  const renderMenuItem = () => {
    return (
      <MenuItem
        key={name}
        component={NavLinkRef}
        path={path}
        sx={{
          py: 0,
          minHeight: 32
        }}
        ref={ref}
        tabIndex={0}
        {...rest}
      >
        {iconName ? (
          <ListItemIcon sx={{ color: 'inherit' }}>
            <DynamicMuiIcon iconName={iconName} />
          </ListItemIcon>
        ) : (
            <ListItemIcon sx={{ color: 'inherit' }} />
          )
        }
        <ListItemText
          primary={translate(`menus.${name}.title`)}
          primaryTypographyProps={{
            fontSize: 14,
            marginLeft: '20px',
            fontWeight: 'medium'
          }}
        />
      </MenuItem>
    );
  };

  return sidebarOpen ? (
    renderMenuItem()
  ) : (
      <Tooltip title={translate(`menus.${name}.title`)} placement="right">
        {renderMenuItem()}
      </Tooltip>
    );
});

export default MenuItemHelper;