import React from 'react';
import PropTypes from 'prop-types';
import BootStrapCoreUI from './BootStrapCoreUI';
import { NotFoundHelper, LoadingHelper } from '../material-helpers';

const BootStrapUI = props => <BootStrapCoreUI {...props} />;

BootStrapUI.defaultProps = {
  catchAll: NotFoundHelper,
  loading: LoadingHelper
};

BootStrapUI.propTypes = {
  layout: PropTypes.any,
  catchAll: PropTypes.any,
  loading: PropTypes.any,
  loginPage: PropTypes.any,
  registerPage: PropTypes.any,
  logout: PropTypes.any,
};

export default BootStrapUI;