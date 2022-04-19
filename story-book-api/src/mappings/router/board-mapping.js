'use strict';

const BoardService = require('../../services/web-admin-board');

module.exports = [
  /**
   * GET ALL BOARDS
   */
  {
    pathName: '/boards',
    method: 'GET',
    methodName: 'getBoards',
    serviceName: BoardService,
    input: {
      transform: function (req) {
        return {
          params: req.query,
          redisKey: req.path,
        };
      },
    },
    output: {
      transform: function (response) {
        return {
          headers: {
            'X-Total-Count': response.total,
            'Access-Control-Expose-Headers': 'X-Total-Count',
          },
          body: { result: response.result, total: response.total },
          message: response.message,
        };
      },
    },
  },
  /**
   * GET BOARD BY ID
   */
  {
    pathName: '/boards/:id',
    method: 'GET',
    methodName: 'getBoardById',
    serviceName: BoardService,
    input: {
      transform: function (req) {
        return {
          id: req.params.id,
          redisKey: req.path,
        };
      },
    },
    output: {
      transform: function (response) {
        return {
          body: response,
          message: response.message,
        };
      },
    },
  },
];
