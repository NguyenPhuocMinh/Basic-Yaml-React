import { createElement } from 'react';
import { get } from 'lodash';
import { registerComponents } from '../dynamic';

const DynamicMui = props => {
  const componentDefinition = get(props, 'componentDefinition');
  const type = get(componentDefinition, 'name');

  return createElement(
    registerComponents[type],
    {
      id: type,
      key: type,
      data: componentDefinition
    },
    null
  )
};

export default DynamicMui;