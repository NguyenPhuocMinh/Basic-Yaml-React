import { createElement } from 'react';

const WithPermissions = (props) => {
  const {
    authParams,
    children,
    render,
    component,
    staticContext,
    ...rest
  } = props;

  // useAuthenticated(authParams);
  // const { permissions } = usePermissionsOptimized(authParams);
  if (component) {
    return createElement(component,
      {
        // permissions,
        ...rest
      }
    );
  }
};

export default WithPermissions;