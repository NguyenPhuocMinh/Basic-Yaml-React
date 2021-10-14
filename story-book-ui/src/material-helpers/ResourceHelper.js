import React from 'react';
import PropTypes from 'prop-types';
// redux
import { Route, Switch } from 'react-router-dom';
import { ResourceContextProvider } from '../contexts';
import { WithPermissions } from '../auth';

const ResourceHelper = props => {
  const {
    name,
    create,
    show,
    edit,
    list,
    basePath,
    dashboard,
    ...rest
  } = props;

  return (
    <ResourceContextProvider value={name}>
      <Switch>
        {create && (
          <Route
            path={`${basePath}/create`}
            render={routeProps => (
              <WithPermissions
                component={create}
                basePath={basePath}
                {...routeProps}
                {...rest}
              />
            )}
          />
        )}
        {show && (
          <Route
            path={`${basePath}/:id/show`}
            render={routeProps => (
              <WithPermissions
                component={show}
                basePath={basePath}
                id={decodeURIComponent(
                  (routeProps.match)
                    .params.id
                )}
                {...routeProps}
                {...rest}
              />
            )}
          />
        )}
        {edit && (
          <Route
            path={`${basePath}/:id`}
            render={routeProps => (
              <WithPermissions
                component={edit}
                basePath={basePath}
                id={decodeURIComponent(
                  (routeProps.match)
                    .params.id
                )}
                {...routeProps}
                {...rest}
              />
            )}
          />
        )}
        {list && (
          <Route
            path={`${basePath}`}
            render={routeProps => {
              return (
                <WithPermissions
                  component={list}
                  basePath={basePath}
                  {...routeProps}
                  {...rest}
                />
              )
            }}
          />
        )}
      </Switch>
    </ResourceContextProvider>
  )
};

ResourceHelper.propTypes = {
  name: PropTypes.string,
  component: PropTypes.string
}

export default ResourceHelper;