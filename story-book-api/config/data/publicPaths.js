'use strict';

/**
 * for paths verify token in cookie or header and don't need to check permissions of user login
 */
module.exports = [
  /**
   * HOME
   */
  {
    enable: true,
    method: 'GET',
    pathName: '/home',
  },
  /**
   * CONTACT
   */
  {
    enable: true,
    method: 'GET',
    pathName: '/contacts',
  },
  /**
   * REFRESH TOKEN
   */
  {
    enable: true,
    method: 'POST',
    pathName: '/auth/refreshToken',
  },
  /**
   * USER LOGOUT
   */
  {
    enable: true,
    method: 'POST',
    pathName: '/auth/logout',
  },
];
