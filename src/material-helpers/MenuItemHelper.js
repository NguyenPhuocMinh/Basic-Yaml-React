import {
  forwardRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// material ui
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  ListItemButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// router dom
import { DynamicMuiIcon } from '../common';
import NavLinkRef from './NavLinkRef';

const useStyles = makeStyles(
  theme => ({
    root: {
      color: theme.palette.text.secondary,
    },
    active: {
      color: '#fff',
      // background: '#F4F3DF',
      fontWeight: '600 !important'
    },
    icon: { minWidth: theme.spacing(5) },
  }),
);

const MenuItemHelper = forwardRef((props, ref) => {
  const {
    classes: classesOverride,
    className,
    primaryText,
    leftIcon,
    onClick,
    tooltipProps,
    ...rest
  } = props;

  const classes = useStyles(props);

  const handleMenuTap = useCallback(
    e => onClick && onClick(e),
    [onClick]
  );

  const renderMenuItem = () => {
    return (
      <ListItemButton
        className={classnames(classes.root, className)}
        activeClassName={classes.active}
        component={NavLinkRef}
        ref={ref}
        tabIndex={0}
        {...rest}
        onClick={handleMenuTap}
        sx={{
          py: 0,
          minHeight: 32,
        }}
      >
        {leftIcon && (
          <ListItemIcon className={classes.icon}>
            <DynamicMuiIcon iconName={leftIcon} />
          </ListItemIcon>
        )}
        <ListItemText
          primary={primaryText}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: 'medium',
            paddingLeft: !leftIcon ? '35px' : '0px'
          }}
        />
      </ListItemButton>
    );
  };

  return (
    <Tooltip title={primaryText} placement="right" {...tooltipProps}>
      {renderMenuItem()}
    </Tooltip>
  )
});

MenuItemHelper.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  leftIcon: PropTypes.string,
  onClick: PropTypes.func,
  primaryText: PropTypes.node,
  staticContext: PropTypes.object,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  sidebarIsOpen: PropTypes.bool,
};

export default MenuItemHelper;