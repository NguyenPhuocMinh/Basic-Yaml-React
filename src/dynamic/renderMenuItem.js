import { createElement } from 'react';
import registerComponents from './registerComponents';

const renderMenuItem = (data) => {
  return createElement(
    registerComponents['menuItem'],
    {
      id: data.name,
      key: data.name,
      name: data.name,
      ...data
    }
  )
}

export default renderMenuItem;