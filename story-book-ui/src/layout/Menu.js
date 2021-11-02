import React from 'react';
import { NavBar, NavDivider } from './NavLayout';
import {
  SubMenuHelper,
  MenuItemHelper,
  DashboardItemHelper,
  useTranslate
} from '../core';

const Menu = ({ hasDashboard, ...props }) => {
  // hooks
  const translate = useTranslate();

  return (
    <NavBar>
      {hasDashboard && <DashboardItemHelper />}
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