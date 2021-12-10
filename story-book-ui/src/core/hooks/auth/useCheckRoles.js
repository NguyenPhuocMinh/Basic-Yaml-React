import { map } from 'lodash';

const useCheckRoles = (permissions = [], roles = []) =>
  map(roles, (role) => permissions.includes(role)).includes(true);

export default useCheckRoles;
