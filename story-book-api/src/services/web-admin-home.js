'use strict';

function HomeService(params = {}) {
  const { dataGraphqlStore } = params;
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
  this.home = async function (args, opts = {}) {
    const data = await dataGraphqlStore.mutationData({
      operationName: 'author',
      returnFields: ['name'],
      variables: {
        name: { value: 'hello', required: true },
      },
    });
    console.log('🚀 ~ file: web-admin-contact.js ~ line 23 ~ data', data);
    return { message: 'HomeMessage' };
  };
}

HomeService.reference = {
  dataGraphqlStore: 'app-repo-store/dataGraphqlStore',
};

exports = module.exports = new HomeService();
exports.register = HomeService;
