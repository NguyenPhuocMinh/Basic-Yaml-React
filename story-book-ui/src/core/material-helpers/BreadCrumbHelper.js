import React from 'react';
import { Link, Breadcrumbs, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { createIcon } from '../../dynamic';
import { useTranslate } from '../hooks';

const BreadcrumbHelper = (props) => {
  const { routes } = props;
  const { translate } = useTranslate();
  const location = useLocation();
  const pathName = location.pathname;
  const pathNames = pathName.split('/').filter((x) => x);

  const childBreadcrumbs = routes.filter((e) => e.pathName === pathName);

  let breadcrumbs = [];

  for (let i = 0; i < childBreadcrumbs.length; i++) {
    const { parent } = childBreadcrumbs[i];
    if (!isEmpty(parent)) {
      breadcrumbs = routes.filter((e) => e.pathName === parent.pathName);
    }
  }

  return (
    <Box p={1}>
      <Breadcrumbs variant="contained" color="primary">
        {breadcrumbs.concat(childBreadcrumbs).map((route, index) => {
          console.log("🚀 ~ file: BreadCrumbHelper.js ~ line 30 ~ {breadcrumbs.concat ~ route", route)
          const to = `/${pathNames.slice(0, index + 1).join('/')}`;

          return route.parent !== null ? (
            <Box display="flex" flexWrap="wrap" alignItems="center">
              {createIcon({ icon: route.leftIcon })}
              <Typography
                variant="body2"
                fontSize="small"
                fontWeight={500}
                key={to}
                marginLeft="5px"
              >
                {translate(route.routeName)}
              </Typography>
            </Box>
          ) : (
            <Box display="flex" flexWrap="wrap" alignItems="center">
              {createIcon({ icon: route.leftIcon })}
              <Link
                variant="body2"
                fontSize="small"
                fontWeight={500}
                underline="hover"
                color="inherit"
                marginLeft="5px"
                key={to}
                href={to}
              >
                {translate(route.routeName)}
              </Link>
            </Box>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbHelper;
