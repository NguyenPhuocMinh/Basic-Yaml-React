'use strict';

const permissions = require('./permissions');

/**
 * for paths verify tokens in cookie or header and check permissions of user login
 */
module.exports = [
  /**
   * BOARDS
   */
  {
    enable: true,
    method: 'GET',
    pathName: '/boards',
    permission: permissions.ADMIN.BOARDS.GET,
  },
  {
    enable: true,
    method: 'GET',
    pathName: '/boards/:id',
    permission: permissions.ADMIN.BOARDS.GET_ID,
  },
  {
    enable: true,
    method: 'CREATE',
    pathName: '/boards/:id',
    permission: permissions.ADMIN.BOARDS.CREATE,
  },
  {
    enable: true,
    method: 'UPDATE',
    pathName: '/boards/:id',
    permission: permissions.ADMIN.BOARDS.EDIT,
  },
];
