import packageMeta from '../../package.json';
import { LayoutBootStrap } from 'story-bootstrap';
// redux
import { useSelector } from 'react-redux';
// components
import AppBar from './AppBar';
import Menu from './Menu';
// themes
import { lightTheme, darkTheme } from '../themes';
import routes from './routes';
import registerIcons from '../registerIcons';

const Layout = (props) => {
  // store
  const themeStore = useSelector((state) => state.theme);
  const theme = themeStore === 'light' ? lightTheme : darkTheme;

  return (
    <LayoutBootStrap
      {...props}
      appBar={AppBar}
      menu={Menu}
      theme={theme}
      drawerWidth={300}
      version={packageMeta.version}
      routes={routes}
      registerIcons={registerIcons}
    />
  );
};

export default Layout;
