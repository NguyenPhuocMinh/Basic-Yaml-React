import { createElement } from 'react';
import { get } from 'lodash';
import { registerComponents } from '../dynamic';

const DynamicMui = props => {
  const resource = get(props, 'resource');
  const component = get(resource, 'component');
  const name = get(resource, 'name');

  return createElement(
    registerComponents[component],
    {
      id: name,
      key: name,
      name: name,
      ...props
    },
    null
  )
};

export default DynamicMui;