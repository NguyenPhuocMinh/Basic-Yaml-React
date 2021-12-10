import React from 'react';
import { NavBar, NavDivider } from './NavLayout';
import {
  SubMenuHelper,
  MenuItemHelper,
  DashboardItemHelper,
  useTranslate,
  usePermissions
} from '../core';

const Menu = ({ hasDashboard, ...props }) => {
  // hooks
  const { translate } = useTranslate();
  const { permissions } = usePermissions();

  return (
    <NavBar>
      {hasDashboard && <DashboardItemHelper />}
      <NavDivider />
      <SubMenuHelper
        primaryText={translate('resources.ancients.name')}
        leftIcon="AutoAwesomeMotion"
      >
        <MenuItemHelper
          to={{
            pathname: '/vampire-list',
            state: { _scrollToTop: true }
          }}
          primaryText={translate('resources.ancients.vampires.name', {
            smart_count: 2
          })}
        />
        <MenuItemHelper
          to={{
            pathname: '/monster-list',
            state: { _scrollToTop: true }
          }}
          primaryText={translate('resources.ancients.monsters.name', {
            smart_count: 2
          })}
        />
      </SubMenuHelper>
      <NavDivider />
    </NavBar>
  );
};

export default Menu;
