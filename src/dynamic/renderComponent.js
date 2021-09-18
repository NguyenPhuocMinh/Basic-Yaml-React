import createComponent from './createComponent';
import { get, isEmpty } from 'lodash';

const renderComponent = (data) => {
  const components = get(data, 'components');
  if (isEmpty(components)) {
    return null;
  } else {
    return components.map((component) => {
      return createComponent(component);
    })
  }
};

export default renderComponent;