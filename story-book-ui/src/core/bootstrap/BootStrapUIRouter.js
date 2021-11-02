import React, {
  Children,
  useEffect,
  cloneElement,
  createElement,
} from 'react';
import { Route, Switch } from 'react-router-dom';
import RoutesWithLayout from '../routes/RoutesWithLayout';
// hooks
import {
  useLogout,
  useGetPermissions,
  useAuthState,
  useSafeSetState,
  useTimeout
} from '../hooks';

const BootStrapUIRouter = (props) => {

  const getPermissions = useGetPermissions();
  const doLogout = useLogout();
  const { authenticated } = useAuthState();
  const oneSecondHasPassed = useTimeout(1000);
  const [computedChildren, setComputedChildren] = useSafeSetState([]);

  useEffect(() => {
    if (typeof props.children === 'function') {
      initializeResources();
    }
  }, [authenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const initializeResources = async () => {
    try {
      const permissions = await getPermissions();
      const resolveChildren = props.children;

      const childrenFuncResult = resolveChildren(permissions);
      if ((childrenFuncResult).then) {
        (childrenFuncResult).then(
          resolvedChildren =>
            setComputedChildren(
              resolvedChildren
                .filter(child => child)
                .map(child => ({
                  ...child,
                  props: {
                    ...child.props,
                    key: child.props.name,
                  },
                }))
            )
        );
      } else {
        setComputedChildren(
          (childrenFuncResult).filter(
            child => child
          )
        );
      }
    } catch (error) {
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
    title,
  } = props;

  if (
    (typeof children === 'function' &&
      (!computedChildren || computedChildren.length === 0)) ||
    (Array.isArray(children) && children.length === 0)
  ) {
    return (
      <Switch>
        {oneSecondHasPassed && (
          <Route
            key="loading"
            render={() => <LoadingPage theme={theme} />}
          />
        )}
      </Switch>
    );
  }

  const childrenToRender = (typeof children === 'function'
    ? computedChildren
    : children
  )

  return (
    <div>
      {Children.map(
        childrenToRender,
        (child) =>
          cloneElement(child, {
            key: child.props.name,
            intent: 'registration',
          })
      )}
      <Switch>
        <Route
          path="/"
          render={(renderProps) => {
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
                {Children.map(
                  childrenToRender,
                  (
                    child
                  ) =>
                    cloneElement(child, {
                      key: child.props.name,
                      intent: 'route',
                    })
                )}
              </RoutesWithLayout>
            )
          }}
        />
      </Switch>
    </div>
  );
};

export default BootStrapUIRouter;