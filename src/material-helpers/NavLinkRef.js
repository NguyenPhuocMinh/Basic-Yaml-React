import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkRef = forwardRef((props, ref) => {
  return (
    <NavLink innerRef={ref} {...props} />
  )
});

export default NavLinkRef;