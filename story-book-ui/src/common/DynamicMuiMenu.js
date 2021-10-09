import { renderMenu } from '../dynamic';
import { get } from 'lodash';
import { Box } from '@mui/material';
import { NavBar } from '../layout/NavLayout';

const DynamicMuiMenu = props => {
  const menuRouters = get(props, 'menuRouters');

  return (
    <NavBar>
      {menuRouters.map((item, index) => {
        return (
          <Box key={index}>
            {renderMenu(item)}
          </Box>
        )
      })}
    </NavBar>
  )
};

export default DynamicMuiMenu;