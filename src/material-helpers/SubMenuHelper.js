import { useState } from 'react';
// redux
import { useSelector } from 'react-redux';
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

const useStyles = makeStyles(theme => ({
  singleResource: {
    '& .MuiSvgIcon-root': {
      color: (props) => props.theme === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#fff',
      fill: 'currentcolor',
      marginRight: theme.spacing(-0.5),
      fontSize: '20px'
    },
    '& .MuiTypography-root': {
      fontSize: '15px',
      color: (props) => props.theme === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#fff'
    }
  }
}));

const SubMenuHelper = props => {
  const {
    name,
    iconName,
    groups,
    dense,
    pathName
  } = props;
  // store
  const theme = useSelector(state => state.theme);
  // hooks
  const classes = useStyles({ theme });
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
                  primaryText={translate(`resources.${item.name}.title`, {
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
      <Box>
        <MenuItemHelper
          className={classes.singleResource}
          key={name}
          to={{
            pathname: pathName,
            state: { _scrollToTop: true },
          }}
          primaryText={translate(`resources.${name}.title`, {
            smart_count: 2,
          })}
          leftIcon={iconName}
          dense={dense}
        />
      </Box>
    );
};

export default SubMenuHelper;