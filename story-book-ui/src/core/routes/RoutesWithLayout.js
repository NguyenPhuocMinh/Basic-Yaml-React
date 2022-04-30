import React, { Children, cloneElement, createElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import WithPermissions from '../hoc/auth/WithPermissions';

const defaultAuthParams = { route: 'dashboard' };

const RoutesWithLayout = (props) => {
  const { catchAll, children, dashboard, title } = props;
  const childrenAsArray = Children.toArray(children);
  const firstChild = childrenAsArray.length > 0 ? childrenAsArray[0] : null;

  return (
    <Switch>
      {Children.map(children, (child) => (
        <Route
          key={child.props.name}
          path={`/${child.props.name}`}
          render={(props) =>
            cloneElement(child, {
              intent: 'route',
              ...props
            })
          }
        />
      ))}
      {dashboard ? (
        <Route
          exact
          path="/"
          render={(routeProps) => {
            return (
              <WithPermissions
                authParams={defaultAuthParams}
                component={dashboard}
                {...routeProps}
              />
            );
          }}
        />
      ) : firstChild ? (
        <Route
          exact
          path="/"
          render={() => <Redirect to={`/${firstChild.props.name}`} />}
        />
      ) : null}
      <Route
        render={(routeProps) => {
          return createElement(catchAll, {
            ...routeProps,
            title
          });
        }}
      />
    </Switch>
  );
};

export default RoutesWithLayout;
