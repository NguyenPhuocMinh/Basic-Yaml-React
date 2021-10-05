import { forwardRef } from 'react';
// redux
import { useSelector } from 'react-redux';
// material ui
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
// router dom
import { NavLink } from 'react-router-dom';
// i18n
import { useTranslation } from 'react-i18next';

const NavLinkRef = forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

const MenuItemHelper = forwardRef((props, ref) => {
  console.log("🚀 ~ file: MenuItemHelper.js ~ line 18 ~ MenuItemHelper ~ props", props)
  const {
    className,
    primaryText,
    leftIcon,
    onClick,
    name,
    ...rest
  } = props;

  // hooks
  const { t: translate } = useTranslation();
  const sidebarOpen = useSelector((state) => state.admin.ui.sidebarOpen);

  const renderMenuItem = () => {
    return (
      <ListItemButton
        key={name}
        sx={{
          py: 0,
          minHeight: 32
        }}
      >
        <ListItemIcon sx={{ color: 'inherit' }}>
        </ListItemIcon>
        <ListItemText
          primary={translate(`menus.${name}.title`)}
          primaryTypographyProps={{
            fontSize: 14,
            marginLeft: '20px',
            fontWeight: 'medium'
          }}
        />
      </ListItemButton>
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