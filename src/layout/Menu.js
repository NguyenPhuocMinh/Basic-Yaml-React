// lodash
import { get } from 'lodash';
import { DynamicMuiMenu } from '../common';

const Menu = props => {

  const menuRouters = get(props, 'menuRouters');

  return (
    <DynamicMuiMenu menuRouters={menuRouters} />
  )
};

export default Menu;