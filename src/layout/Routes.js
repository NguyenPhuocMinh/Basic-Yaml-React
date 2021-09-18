import {
  Home,
  Order,
  Product
} from '../views';

const ROUTES = [
  {
    path: '/',
    exact: true,
    main: Home
  },
  {
    path: '/orders',
    main: Order
  },
  {
    path: '/products',
    main: Product
  },
];

export default ROUTES;