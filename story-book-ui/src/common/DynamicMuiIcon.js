import { createElement } from 'react';
import { registerIcons } from '../dynamic';

const DynamicMuiIcon = ({ iconName }) => {

  return createElement(
    registerIcons[iconName],
    null,
    null
  )
};

export default DynamicMuiIcon;