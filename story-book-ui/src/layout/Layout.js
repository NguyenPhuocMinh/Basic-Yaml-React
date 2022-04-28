import React from 'react';
// redux
import { useSelector } from 'react-redux';
import AppBar from './AppBar';
import Menu from './Menu';
import { LayoutHelper } from '../core';
// themes
import { lightTheme, darkTheme } from '../themes';

const Layout = (props) => {
  console.log('🚀 ~ file: Layout.js ~ line 11 ~ Layout ~ props', props);
  // store
  const themeStore = useSelector((state) => state.theme);
  const theme = themeStore === 'light' ? lightTheme : darkTheme;

  return (
    <LayoutHelper
      {...props}
      appBar={AppBar}
      menu={Menu}
      theme={theme}
      drawerWidth={300}
    />
  );
};

export default Layout;
