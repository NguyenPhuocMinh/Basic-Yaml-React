import { createElement } from 'react';
import registerIcons from './registerIcons';

const createIcon = (component) => {
  const { iconName, ...rest } = component;

  return createElement(
    registerIcons[iconName],
    {
      ...rest,
    },
  )
};

export default createIcon;