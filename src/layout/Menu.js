import { useState } from 'react';
import NavBar from './NavBar';
// lodash
import { get } from 'lodash';
import { DynamicMuiMenu } from '../common';

const Menu = props => {
  // states
  const [toggle, setToggle] = useState({});

  const handleToggle = (newToggle) => {
    setToggle((prevToggle) => {
      return {
        ...prevToggle,
        [newToggle]: !prevToggle[newToggle]
      }
    })
  };

  const menuRouters = get(props, 'menuRouters');

  return (
    <NavBar>
      <DynamicMuiMenu menuRouters={menuRouters} />
    </NavBar>
  )
};

export default Menu;