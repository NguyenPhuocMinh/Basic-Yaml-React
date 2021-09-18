import Home from '@mui/icons-material/Home';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddModeratorIcon from '@mui/icons-material/AddModerator';

const LIST_ITEMS = [
  {
    text: 'Home',
    path: '/',
    icon: <Home />
  },
  {
    text: 'Order',
    path: '/orders',
    icon: <AddPhotoAlternateIcon />
  },
  {
    text: 'Product',
    path: '/products',
    icon: <AddModeratorIcon />
  }
];

export default LIST_ITEMS;