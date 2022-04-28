'use strict';

function ContactService(params = {}) {
  const { dataGraphqlStore } = params;
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
    const data = await dataGraphqlStore.queryData({ type: 'authors' });
    console.log("🚀 ~ file: web-admin-contact.js ~ line 23 ~ data", data)
    return { message: 'ContactMessage' };
  };
}

ContactService.reference = {
  dataGraphqlStore: 'app-repo-store/dataGraphqlStore',
};

exports = module.exports = new ContactService();
exports.register = ContactService;
