import { RESOURCE_TYPES } from '../constants';

const registerResource = (resource) => ({
  type: RESOURCE_TYPES.REGISTER_RESOURCE,
  payload: resource,
});

const unregisterResource = (resourceName) => ({
  type: RESOURCE_TYPES.UNREGISTER_RESOURCE,
  payload: resourceName,
});

const resourcesActions = {
  registerResource,
  unregisterResource
};

export default resourcesActions;