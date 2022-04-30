import {
  SubMenuBootStrap,
  MenuItemBootStrap,
  DashboardItemBootStrap,
  useTranslate
} from 'story-bootstrap';
import {} from 'react-router-dom';
import { NavBar, NavDivider } from './NavLayout';
import registerIcons from '../registerIcons';

const Menu = ({ hasDashboard, ...props }) => {
  // hooks
  const { translate } = useTranslate();

  return (
    <NavBar>
      {hasDashboard && <DashboardItemBootStrap registerIcons={registerIcons} />}
      <NavDivider />
      <SubMenuBootStrap
        primaryText={translate('resources.ancients.name')}
        leftIcon="AutoAwesomeMotion"
        registerIcons={registerIcons}
      >
        <MenuItemBootStrap
          to={{
            pathname: '/vampire-list',
            state: { _scrollToTop: true }
          }}
          primaryText={translate('resources.ancients.vampires.name', {
            smart_count: 2
          })}
          registerIcons={registerIcons}
        />
        <MenuItemBootStrap
          to={{
            pathname: '/monster-list',
            state: { _scrollToTop: true }
          }}
          primaryText={translate('resources.ancients.monsters.name', {
            smart_count: 2
          })}
          registerIcons={registerIcons}
        />
      </SubMenuBootStrap>
      <NavDivider />
    </NavBar>
  );
};

export default Menu;
