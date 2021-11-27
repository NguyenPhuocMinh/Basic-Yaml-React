'use strict';

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
