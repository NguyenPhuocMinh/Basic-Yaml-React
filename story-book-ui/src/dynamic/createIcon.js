import { createElement } from 'react';
import registerIcons from './registerIcons';

const createIcon = ({ icon }) => {

  return createElement(
    registerIcons[icon],
  )
};

export default createIcon;