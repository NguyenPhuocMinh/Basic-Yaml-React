import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkRef = forwardRef((props, ref) => {
  console.log('🚀 ~ file: NavLinkRef.js ~ line 5 ~ ref', ref);
  console.log('🚀 ~ file: NavLinkRef.js ~ line 5 ~ props', props);
  return <NavLink innerRef={ref} {...props} />;
});

export default NavLinkRef;
