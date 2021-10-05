import { useState } from 'react';
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
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DynamicMuiIcon } from '../common';
import { renderMenuItem } from '../dynamic';
import { isEmpty } from 'lodash';

const SubMenuHelper = props => {
  const {
    name,
    iconName,
    groups,
    dense
  } = props;
  // hooks
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

  return (
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
                {renderMenuItem(item)}
              </Box>
            )
          })}
        </List>
      </Collapse>
      {toggle[name] ? <Divider /> : <> </>}
    </Box>
  );
};

export default SubMenuHelper;