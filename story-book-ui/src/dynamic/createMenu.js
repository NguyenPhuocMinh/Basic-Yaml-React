import { createElement } from 'react';
import registerComponents from './registerComponents';

const createMenu = (group) => {
  console.log("🚀 ~ file: createMenu.js ~ line 5 ~ createMenu ~ group", group)
  const { type, name, children, ...rest } = group;

  return createElement(
    registerComponents['menu'],
    {
      id: name,
      key: name,
      name: name,
      ...rest,
    },
    children && children.map((c) => createMenu(c))
  )
};

export default createMenu;