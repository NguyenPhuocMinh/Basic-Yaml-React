import { useState } from 'react';
// i18n
import { useTranslation } from 'react-i18next';
import {
  Box,
  Tooltip,
  ListItemIcon,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DynamicMuiIcon } from '../common';
// lodash
import { isEmpty } from 'lodash';
import MenuItemHelper from './MenuItemHelper';

const useStyles = makeStyles({
  iconSingle: {
    '& .MuiSvgIcon-root': {
      color: 'rgba(0, 0, 0, 0.87)',
      fill: 'currentcolor',
      marginRight: '-3px',
      fontSize: '20px'
    },
    '& .MuiTypography-root': {
      lineHeight: '20px',
      fontSize: '15px',
      color: 'rgba(0, 0, 0, 0.87)'
    }
  }
})

const SubMenuHelper = props => {
  const {
    name,
    iconName,
    groups,
    dense,
    pathName
  } = props;
  // hooks
  const classes = useStyles();
  const { t: translate } = useTranslation();
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
      key={name}
      onClick={() => handleToggle(name)}
      sx={{ px: 3 }}
    >
      <ListItemIcon sx={{ color: 'inherit' }}>
        <DynamicMuiIcon iconName={iconName} />
      </ListItemIcon>
      <ListItemText
        primary={translate(`resources.${name}.title`)}
        primaryTypographyProps={{
          fontSize: 15,
          fontWeight: 'medium',
          lineHeight: '20px',
          mb: '2px',
        }}
        sx={{ my: 0 }}
      />
      {toggle[name] ? (
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

  return isEmpty(pathName) ? (
    <Box>
      <Tooltip title={translate(`resources.${name}.title`)} placement="right">
        {header}
      </Tooltip>
      <Collapse in={toggle[name]} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
        >
          {!isEmpty(groups) && groups.map((item, index) => {
            return (
              <Box key={index}>
                <MenuItemHelper
                  key={item.name}
                  to={{
                    pathname: item.pathName,
                    state: { _scrollToTop: true },
                  }}
                  primaryText={translate(`menus.${item.name}.title`, {
                    smart_count: 2,
                  })}
                  leftIcon={item.iconName}
                  dense={dense}
                />
              </Box>
            )
          })}
        </List>
      </Collapse>
      {toggle[name] ? <Divider /> : <> </>}
    </Box>
  ) : (
      <MenuItemHelper
        className={classes.iconSingle}
        key={name}
        to={{
          pathname: pathName,
          state: { _scrollToTop: true },
        }}
        primaryText={translate(`menus.${name}.title`, {
          smart_count: 2,
        })}
        leftIcon={iconName}
        dense={dense}
      />
    );
};

export default SubMenuHelper;