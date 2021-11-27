import { map } from 'lodash';

const useCheckRoles = (permissions = [], roles = []) => {
  return map(roles, (role) => permissions.includes(role)).includes(true);
};

export default useCheckRoles;