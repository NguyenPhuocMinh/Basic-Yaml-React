import React from 'react';
import PropTypes from 'prop-types';
// router dom
import { Route, Switch } from 'react-router-dom';
import { ResourceContext } from '../contexts';
import { WithPermissions } from '../hoc';

const ResourceCore = (props) => {
  const { name, component, match } = props;

  const basePath = match ? match.path : '';

  return (
    <ResourceContext.Provider value={name}>
      <Switch>
        <Route
          path={`${basePath}`}
          render={(routeProps) => (
            <WithPermissions
              component={component}
              basePath={basePath}
              {...routeProps}
            />
          )}
        />
      </Switch>
    </ResourceContext.Provider>
  );
};

ResourceCore.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.any.isRequired
};

export default ResourceCore;
