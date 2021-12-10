import { List, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const NavBar = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20
  }
});

const NavDivider = styled(Divider)({
  margin: '8px 0'
});

export { NavBar, NavDivider };
