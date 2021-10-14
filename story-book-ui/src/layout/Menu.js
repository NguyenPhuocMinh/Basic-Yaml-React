import React from 'react';
import { NavBar, NavDivider } from './NavLayout';
import DashboardMenuItem from './Dashboard';
import { SubMenuHelper, MenuItemHelper } from '../material-helpers';
import { useTranslation } from 'react-i18next';

const Menu = ({ dense = false }) => {
  // hooks
  const { t: translate } = useTranslation();

  return (
    <NavBar>
      <DashboardMenuItem />
      <NavDivider />
      {/* Ancients */}
      <SubMenuHelper
        primaryText={translate("resources.ancients.name")}
        leftIcon="AutoAwesomeMotion"
      >
        {/* Vampires */}
        <MenuItemHelper
          to={{
            pathname: '/vampires',
            state: { _scrollToTop: true },
          }}
          primaryText={translate(`resources.ancients.vampires.name`, {
            smart_count: 2,
          })}
        />
        {/* Monsters */}
        <MenuItemHelper
          to={{
            pathname: '/monsters',
            state: { _scrollToTop: true },
          }}
          primaryText={translate(`resources.ancients.monsters.name`, {
            smart_count: 2,
          })}
        />
      </SubMenuHelper>
      <NavDivider />
    </NavBar>
  )
};

export default Menu;