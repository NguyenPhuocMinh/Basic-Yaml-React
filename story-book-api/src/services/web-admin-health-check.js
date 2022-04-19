'use strict';

function HealthCheckService(params = {}) {
  /**
   * @swagger
   * /rest/api/healths:
   *   get:
   *      summary: Heal check connect consul
   *      description: Welcome to health check user
   *      responses:
   *        200:
   *         description: Success
   */

  /**
   * HEALTH CHECK
   * @param {*} args
   * @param {*} opts
   */
  this.healthCheck = function (args, opts = {}) {
    return { message: 'HealthCheckMessage' };
  };
}

exports = module.exports = new HealthCheckService();
exports.register = HealthCheckService;
