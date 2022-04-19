'use strict';

function HomeService(params = {}) {
  /**
   * @swagger
   * /rest/api/v1/home:
   *   get:
   *      summary: Home Page
   *      description: Welcome to home admin
   *      responses:
   *        200:
   *         description: Success
   */

  /**
   * HOME
   * @param {*} args
   * @param {*} opts
   */
  this.home = function (args, opts = {}) {
    return { message: 'HomeMessage' };
  };
}

exports = module.exports = new HomeService();
exports.register = HomeService;
