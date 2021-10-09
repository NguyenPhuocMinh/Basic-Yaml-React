import { createElement } from 'react';
import { registerIcons } from '../dynamic';

const DynamicMuiIcon = ({ icon }) => {

  return createElement(
    registerIcons[icon],
    null,
    null
  )
};

export default DynamicMuiIcon;