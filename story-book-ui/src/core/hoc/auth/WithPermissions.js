import {
  createElement,
  useEffect,
  useState
} from 'react';
import {
  useAuthenticated,
  useGetPermissions
} from '../../hooks';
import { isEmpty } from 'lodash';

const WithPermissions = (props) => {
  const {
    authParams,
    children,
    render,
    component,
    ...rest
  } = props;

  const [permissions, setPermissions] = useState(null);

  useAuthenticated(authParams);
  const getPermissions = useGetPermissions();

  useEffect(() => {
    if (!isEmpty(getPermissions)) {
      setPermissions(getPermissions.permissions)
    }
  }, [getPermissions])

  if (component) {
    return createElement(component,
      {
        permissions,
        ...rest
      }
    );
  }
};

export default WithPermissions;