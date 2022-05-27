'use strict';

/**
 * for paths that don't need to check tokens and permissions
 */
module.exports = [
  /**
   * LOGIN
   */
  {
    method: 'POST',
    pathName: '/auth/login'
  },
  /**
   * REGISTER
   */
  {
    method: 'POST',
    pathName: '/auth/register'
  },
  /**
   * CHECK HEALTH
   */
  {
    method: 'GET',
    pathName: '/healths'
  }
];
