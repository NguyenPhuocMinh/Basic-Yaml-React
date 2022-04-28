import React, { Children, cloneElement, createElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import WithPermissions from '../hoc/auth/WithPermissions';

const defaultAuthParams = { route: 'dashboard' };

const RoutesWithLayout = (props) => {
  console.log(
    '🚀 ~ file: RoutesWithLayout.js ~ line 8 ~ RoutesWithLayout ~ props',
    props
  );
  const { catchAll, children, dashboard, title } = props;
  const childrenAsArray = Children.toArray(children);
  const firstChild = childrenAsArray.length > 0 ? childrenAsArray[0] : null;
  console.log(
    '🚀 ~ file: RoutesWithLayout.js ~ line 15 ~ RoutesWithLayout ~ firstChild',
    firstChild
  );

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
            console.log(
              '🚀 ~ file: RoutesWithLayout.js ~ line 43 ~ RoutesWithLayout ~ routeProps',
              routeProps
            );
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
          console.log(
            '🚀 ~ file: RoutesWithLayout.js ~ line 66 ~ RoutesWithLayout ~ routeProps',
            routeProps
          );
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
