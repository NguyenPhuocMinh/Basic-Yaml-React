import React from 'react';
import PropTypes from 'prop-types';
// redux
import { Route, Switch } from 'react-router-dom';
import { ResourceContext } from '../contexts';
import { WithPermissions } from '../hoc';

const ResourceCore = props => {
  const {
    name,
    component,
    basePath,
  } = props;

  return (
    <ResourceContext.Provider value={name}>
      <Switch>
        <Route
          path={basePath}
          render={routeProps => {
            return (
              <WithPermissions
                component={component}
                basePath={basePath}
                {...routeProps}
              />
            )
          }}
        />
      </Switch>
    </ResourceContext.Provider>
  )
};

ResourceCore.propTypes = {
  name: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  component: PropTypes.any.isRequired
}

export default ResourceCore;