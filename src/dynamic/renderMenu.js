import createMenu from './createMenu';
import { get, isEmpty } from 'lodash';

const renderMenu = (data) => {
  const groups = get(data, 'groups');
  if (isEmpty(groups)) {
    return null;
  } else {
    return groups.map((group) => {
      return createMenu(group);
    })
  }
};

export default renderMenu;