import { createElement } from 'react';
import registerComponents from './registerComponents';

const renderMenu = (data) => {
  return createElement(
    registerComponents['menu'],
    {
      id: data.name,
      key: data.name,
      name: data.name,
      ...data
    }
  )
}

export default renderMenu;