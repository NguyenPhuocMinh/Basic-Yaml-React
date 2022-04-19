'use strict';

const permissions = require('./permissions');

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
    permission: permissions.ADMIN.BOARDS.EDIT,
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
