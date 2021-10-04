import { useTranslation } from 'react-i18next';
// redux
import { useSelector } from 'react-redux';
import {
  Box,
  Tooltip,
  MenuItem,
  ListItemIcon,
  Typography,
  Collapse,
  List,
  ListItemButton,
  ListItemText
} from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const SubMenu = props => {
  console.log("🚀 ~ file: SubMenu.js ~ line 18 ~ props", props)
  const {
    handleToggle,
    isOpen,
    name,
    icon,
    children,
    dense
  } = props;
  const { t: translate } = useTranslation();
  // store
  const sidebarIsOpen = useSelector(state => state.admin.ui.sidebarIsOpen);

  const header = (
    <ListItemButton
      key={name}
      onClick={() => handleToggle(name)}
      sx={{ px: 3 }}
    >
      <ListItemIcon sx={{ color: 'inherit' }}>
        {/* <DynamicMuiIcon iconName={item.iconName} /> */}
      </ListItemIcon>
      <ListItemText
        // primary={item.label}
        primaryTypographyProps={{
          fontSize: 15,
          fontWeight: 'medium',
          lineHeight: '20px',
          mb: '2px',
        }}
        sx={{ my: 0 }}
      />
      {isOpen ? (
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
      {sidebarIsOpen || isOpen ? (
        header
      ) : (
          <Tooltip title={translate(name)} placement="right">
            {header}
          </Tooltip>
        )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
        // className={
        //   sidebarIsOpen
        //     ? classes.sidebarIsOpen
        //     : classes.sidebarIsClosed
        // }
        >
          {children}
        </List>
      </Collapse>
    </Box>
  );
};

export default SubMenu;