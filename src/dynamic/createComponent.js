import { createElement } from 'react';
import registerComponents from './registerComponents';

const createComponent = (component) => {
  const { type, name, children, ...rest } = component;

  return createElement(
    registerComponents[type],
    {
      id: name,
      key: name,
      name: name,
      ...rest,
    },
    children && children.map((c) => createComponent(c))
  )
};

export default createComponent;