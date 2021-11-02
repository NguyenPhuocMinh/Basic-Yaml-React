import { useState } from 'react';
import PropTypes from 'prop-types';
// material ui
import {
  Box,
  Tooltip,
  ListItemIcon,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DynamicMuiIcon } from '../../common';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.common.text,
    '&:hover': {
      color: theme.palette.text.primary,
      borderRadius: 10
    }
  }
}))

const SubMenuHelper = props => {
  const {
    primaryText,
    dense,
    children,
    leftIcon
  } = props;

  // hooks
  const classes = useStyles();

  // states
  const [toggle, setToggle] = useState({});

  // func
  const handleToggle = (newToggle) => {
    setToggle((prevToggle) => {
      return {
        ...prevToggle,
        [newToggle]: !prevToggle[newToggle]
      }
    })
  };

  const header = (
    <ListItemButton
      key={primaryText}
      onClick={() => handleToggle(primaryText)}
      sx={{ px: 3 }}
      className={classes.root}
    >
      <ListItemIcon sx={{ color: 'inherit' }}>
        <DynamicMuiIcon icon={leftIcon} />
      </ListItemIcon>
      <ListItemText
        primary={primaryText}
        primaryTypographyProps={{
          variant: 'subtitle2',
          fontWeight: 'medium',
          lineHeight: '1.5',
          mb: '2px',
        }}
        sx={{ my: 0 }}
      />
      {toggle[primaryText] ? (
        <KeyboardArrowDown
          sx={{ mr: -1 }}
        />
      ) : (
          <KeyboardArrowRightIcon
            sx={{ mr: -1 }}
          />
        )
      }
    </ListItemButton>
  );

  return (
    <Box>
      <Tooltip title={primaryText} placement="right">
        {header}
      </Tooltip>
      <Collapse in={toggle[primaryText]} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
        >
          {children}
        </List>
      </Collapse>
    </Box>
  )
};

SubMenuHelper.propTypes = {
  leftIcon: PropTypes.string,
  primaryText: PropTypes.string,
  dense: PropTypes.bool
};

export default SubMenuHelper;