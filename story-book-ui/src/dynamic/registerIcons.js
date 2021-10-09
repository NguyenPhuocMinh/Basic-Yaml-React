import Home from '@material-ui/icons/Home';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import AutoAwesomeMotion from '@mui/icons-material/AutoAwesomeMotion';
import MenuBook from '@mui/icons-material/MenuBook';
import Dashboard from '@mui/icons-material/Dashboard'

const registerIcons = {
  Dashboard: () => <Dashboard />,
  Home: () => <Home />,
  AddPhotoAlternate: () => <AddPhotoAlternate />,
  AddShoppingCart: () => <AddShoppingCart />,
  MenuBook: () => <MenuBook />,
  AutoAwesomeMotion: () => <AutoAwesomeMotion />
};

export default registerIcons;