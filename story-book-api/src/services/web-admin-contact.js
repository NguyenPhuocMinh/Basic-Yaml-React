'use strict';

function ContactService(params = {}) {
  /**
   * @swagger
   * /rest/api/contacts:
   *   get:
   *      summary: Get Contact
   *      description: Welcome to contact
   *      responses:
   *        200:
   *         description: Success
   */

  /**
   * CONTACT
   * @param {*} args
   * @param {*} opts
   */
  this.contact = async function (args, opts = {}) {
    return { message: 'ContactMessage' };
  };
}

exports = module.exports = new ContactService();
exports.register = ContactService;
