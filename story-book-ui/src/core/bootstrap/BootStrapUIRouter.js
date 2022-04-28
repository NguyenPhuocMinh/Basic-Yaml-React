import React, { Children, useEffect, cloneElement, createElement } from 'react';
import { Route, Switch } from 'react-router-dom';
// hooks
import {
  useLogout,
  useGetPermissions,
  useAuthState,
  useSafeSetState,
  useTimeout
} from '../hooks';
import RoutesWithLayout from '../routes/RoutesWithLayout';

const BootStrapUIRouter = (props) => {
  console.log(
    '🚀 ~ file: BootStrapUIRouter.js ~ line 14 ~ BootStrapUIRouter ~ props',
    props
  );
  const getPermissions = useGetPermissions();
  const doLogout = useLogout();
  const { authenticated } = useAuthState();
  const oneSecondHasPassed = useTimeout(1000);
  const [computedChildren, setComputedChildren] = useSafeSetState([]);

  useEffect(() => {
    if (typeof props.children === 'function') {
      console.log("XXXX")
      initializeResources();
    }
  }, [authenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const initializeResources = async () => {
    try {
      const permissions = await getPermissions();
      console.log(
        '🚀 ~ file: BootStrapUIRouter.js ~ line 30 ~ initializeResources ~ permissions',
        permissions
      );
      const resolveChildren = props.children;

      const childrenFuncResult = resolveChildren(permissions);
      if (childrenFuncResult.then) {
        childrenFuncResult.then((resolvedChildren) =>
          setComputedChildren(
            resolvedChildren
              .filter((child) => child)
              .map((child) => ({
                ...child,
                props: {
                  ...child.props,
                  key: child.props.name
                }
              }))
          )
        );
      } else {
        setComputedChildren(childrenFuncResult.filter((child) => child));
      }
    } catch (error) {
      console.log("🚀 ~ file: BootStrapUIRouter.js ~ line 59 ~ initializeResources ~ error", error)
      console.error(error);
      doLogout();
    }
  };

  const {
    layout,
    catchAll,
    children,
    dashboard,
    loading: LoadingPage,
    logout,
    theme,
    title
  } = props;

  if (
    (typeof children === 'function' &&
      (!computedChildren || computedChildren.length === 0)) ||
    (Array.isArray(children) && children.length === 0)
  ) {
    return (
      <Switch>
        {oneSecondHasPassed && (
          <Route key="loading" render={() => <LoadingPage theme={theme} />} />
        )}
      </Switch>
    );
  }

  const childrenToRender =
    typeof children === 'function' ? computedChildren : children;

  return (
    <div>
      <Switch>
        <Route
          path="/"
          render={(renderProps) => {
          console.log("🚀 ~ file: BootStrapUIRouter.js ~ line 120 ~ BootStrapUIRouter ~ renderProps", renderProps)
            return createElement(
              layout,
              {
                dashboard,
                logout,
                theme,
                title,
                ...renderProps
              },
              <RoutesWithLayout
                catchAll={catchAll}
                dashboard={dashboard}
                title={title}
              >
                {Children.map(childrenToRender, (child) =>
                  cloneElement(child, {
                    key: child.props.name,
                    intent: 'route'
                  })
                )}
              </RoutesWithLayout>
            );
          }}
        />
      </Switch>
    </div>
  );
};

export default BootStrapUIRouter;
