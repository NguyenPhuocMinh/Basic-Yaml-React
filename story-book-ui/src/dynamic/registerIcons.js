import {
  Home,
  AddPhotoAlternate,
  AddShoppingCart,
  AutoAwesomeMotion,
  MenuBook,
  Dashboard
} from '@mui/icons-material';
import React from 'react';

const registerIcons = {
  Dashboard: () => <Dashboard />,
  Home: () => <Home />,
  AddPhotoAlternate: () => <AddPhotoAlternate />,
  AddShoppingCart: () => <AddShoppingCart />,
  MenuBook: () => <MenuBook />,
  AutoAwesomeMotion: () => <AutoAwesomeMotion />
};

export default registerIcons;
