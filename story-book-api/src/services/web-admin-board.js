'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const options = require('../../conf/options');
const { isEmpty } = lodash;

function BoardService(params = {}) {
  const { dataMongoStore, redisClient } = params;

  /**
   * @swagger
   * /rest/api/boards:
   *   get:
   *      summary: Get All Boards
   *      description: Welcome to boards
   *      parameters:
   *        - in: query
   *          name: _start
   *          schema:
   *            type: integer
   *          description: The number of items to skip before starting to collect the result
   *        - in: query
   *          name: _end
   *          schema:
   *            type: integer
   *          description: The numbers of items to return
   *      responses:
   *        200:
   *         description: Success
   */

  /**
   * GET ALL BOARDS
   * @param {*} args
   * @param {*} opts
   */
  this.getBoards = async function (args, opts = {}) {
    const { logUtils } = opts;

    const loggerFactory = logUtils.createLogger('story-book-api', 'getBoards');

    try {
      loggerFactory.info(`Function getBoards has been start`);

      const params = args.params;
      const skip = parseInt(params._start) || 0;
      let limit = parseInt(params._end) || 1000;
      limit = limit - skip;

      const boards = await dataMongoStore.find({
        type: 'BoardModel',
        filter: { deleted: false },
        projection: {
          __v: 0,
        },
        options: {
          sort: { registerDate: -1 },
          skip: skip,
          limit: limit,
        },
      });

      const data = await convertDataResponse(boards);

      const total = await dataMongoStore.count({
        type: 'BoardModel',
        filter: { deleted: false },
      });

      // store to redis
      const res = {
        result: data,
        total: total,
        message: 'BoardMessage',
      };
      await redisClient.setEx(args.redisKey, options.redisExpired, JSON.stringify(res), async (err, reply) => {
        if (!err) {
          loggerFactory.debug(`Redis setEx successfully with`, {
            args: reply,
          });
          await redisClient.disconnect();
        }
      });

      loggerFactory.debug(`Function getBoards has been end`);

      return res;
    } catch (err) {
      loggerFactory.error(`Function getMessageBoards has error : ${err}`, {
        args: err.message,
      });
      return Promise.reject(err);
    }
  };

  /**
   * @swagger
   * /rest/api/boards/:id:
   *   get:
   *      summary: Get boards by id
   *      description: Welcome to boards
   *      parameters:
   *        - in: query
   *          name: _start
   *          schema:
   *            type: integer
   *          description: The number of items to skip before starting to collect the result
   *        - in: query
   *          name: _end
   *          schema:
   *            type: integer
   *          description: The numbers of items to return
   *      responses:
   *        200:
   *         description: Success
   */

  /**
   * GET BOARD BY ID
   * @param {*} args
   * @param {*} opts
   */
  this.getBoardById = async function (args, opts = {}) {
    const { logUtils } = opts;

    const loggerFactory = logUtils.createLogger('story-book-api', 'getBoardById');

    try {
      loggerFactory.debug(`Function getBoardById has been start`);

      const boardId = args.id;

      const board = await dataMongoStore.get({
        type: 'BoardModel',
        id: boardId,
      });

      const data = await convertDataBoard(board);

      const res = {
        result: data,
        message: 'BoardMessage',
      };

      // store to redis
      await redisClient.setEx(args.redisKey, options.redisExpired, JSON.stringify(res), async (err, reply) => {
        if (!err) {
          loggerFactory.debug(`Redis setEx successfully with`, {
            args: reply,
          });
          await redisClient.disconnect();
        }
      });

      loggerFactory.debug(`Function getBoardById has been end`);

      return res;
    } catch (err) {
      loggerFactory.error(`Function getBoardById has error`, {
        args: err.message,
      });
      return Promise.reject(err);
    }
  };
}

async function convertDataResponse(boards) {
  return Promise.map(
    boards,
    (board, index) => {
      return convertDataBoard(board, index);
    },
    { concurrency: 5 }
  );
}

function convertDataBoard(board, index) {
  const response = {};
  if (!isEmpty(board)) {
    board = board.toJSON();
    response.id = board._id;
    response.registerDate = board.registerDate;
    response.title = board.title;
    response.name = board.name;
    response.description = board.description;
    response.index = index;

    delete board._id;

    return response;
  } else {
    return Promise.resolve();
  }
}

BoardService.reference = {
  dataMongoStore: 'app-repo-store/dataMongoStore',
  redisClient: 'app-redis-store/redisClient',
};

exports = module.exports = new BoardService();
exports.register = BoardService;
