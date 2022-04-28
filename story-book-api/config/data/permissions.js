'use strict';

const permissions = {
  ADMIN: {
    BOARDS: {
      GET: 'ADMIN_BOARD_GET',
      GET_ID: 'ADMIN_BOARD_GET_BY_ID',
      CREATE: 'ADMIN_BOARD_CREATE',
      EDIT: 'ADMIN_BOARD_EDIT',
      DELETE: 'ADMIN_BOARD_DELETE'
    },
  },
};

module.exports = permissions;
