const routes = [
  {
    parent: null,
    pathName: '/',
    routeName: 'routes.dashBoard.label',
    leftIcon: 'Dashboard',
  },
  {
    parent: null,
    pathName: '/ancients',
    routeName: 'routes.ancient.label',
    leftIcon: 'AutoAwesomeMotion',
  },
  {
    parent: {
      pathName: '/ancients',
      routeName: 'routes.ancient.label',
    },
    pathName: '/vampire-list',
    routeName: 'routes.ancient.child.vampire.label',
    leftIcon: 'Home',
  },
  {
    parent: {
      pathName: '/ancients',
      routeName: 'routes.ancient.label',
    },
    pathName: '/monster-list',
    routeName: 'routes.ancient.child.monster.label',
    leftIcon: 'Home',
  },
];

export default routes;
