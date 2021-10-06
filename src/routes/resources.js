const resources = [
  {
    name: 'home_page',
    component: 'home',
    path: '/',
    exact: true
  },
  {
    name: 'vampire_page',
    component: 'vampires',
    path: '/vampires',
    hasList: true,
    hasCreate: true
  },
  {
    name: 'monster_page',
    component: 'monsters',
    path: '/monsters',
    hasList: true,
  },
];

export default resources;