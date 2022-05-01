const routes = [
  {
    parent: null,
    pathName: '/',
    routerName: 'routes.dashBoard.label',
    leftIcon: 'Dashboard'
  },
  {
    parent: null,
    pathName: '/ancients',
    routerName: 'routes.ancient.label',
    leftIcon: 'AutoAwesomeMotion'
  },
  {
    parent: {
      pathName: '/ancients',
      routerName: 'routes.ancient.label'
    },
    pathName: '/vampire-list',
    routerName: 'routes.ancient.child.vampire.label',
    leftIcon: 'Home'
  },
  {
    parent: {
      pathName: '/ancients',
      routerName: 'routes.ancient.label'
    },
    pathName: '/monster-list',
    routerName: 'routes.ancient.child.monster.label',
    leftIcon: 'Home'
  }
];

export default routes;
