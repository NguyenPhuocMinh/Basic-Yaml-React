const routers = [
  {
    name: 'home',
    iconName: 'Home',
    pathName: '/',
  },
  {
    name: 'ancients',
    iconName: 'AutoAwesomeMotion',
    groups: [
      {
        name: 'vampires',
        pathName: '/vampires',
        groups: [
          {
            name: 'vampires',
            pathName: '/vampires',
          },
          {
            name: 'monsters',
            pathName: '/monsters',
          },
        ]
      },
      {
        name: 'monsters',
        pathName: '/monsters',
      },
    ]
  },
  {
    name: 'animes',
    iconName: 'MenuBook',
    groups: [
      {
        name: 'land',
        pathName: '/lands',
      },
      {
        name: 'ocean',
        pathName: '/oceans',
      },
    ]
  }
];

export default routers;