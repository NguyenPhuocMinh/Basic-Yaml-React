// redux
import { useSelector } from 'react-redux';
// actions
import AppBar from './AppBar';
import Menu from './Menu';
import { LayoutHelper } from '../core';
import { lightTheme, darkTheme } from '../themes';

const Layout = (props) => {
  // store
  const themeStore = useSelector(state => state.theme);
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
}

export default Layout;
