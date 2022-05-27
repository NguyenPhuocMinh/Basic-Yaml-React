'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const tokenGenerator = require('winext-authorization').tokenGenerator;
const bcrypt = winext.require('bcryptjs');
const options = require('../../conf/options');
const { isEmpty, isEqual } = lodash;

function UserService(params = {}) {
  const { dataMongoStore, errorManager } = params;

  const uuidUtils = winext.uuidUtils;
  const slugUtils = winext.slugUtils;

  /**
   * @swagger
   * /rest/api/auth/register:
   *   post:
   *      summary: Register User
   *      description: Welcome to register user
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                      firstName:
   *                        type: string
   *                        default: John
   *                        required: true
   *                      lastName:
   *                        type: string
   *                        default: Doe
   *                        required: true
   *                      email:
   *                        type: string
   *                        required: true
   *                        example: email@gmail.com
   *                      password:
   *                        type: string
   *                        default: 123
   *                      passwordConfirm:
   *                        type: string
   *                        default: 123
   *                      permissions:
   *                        type: array
   *                        item:
   *                          type: string
   *                        example: ['USER']
   *                        default: ['USER']
   *      responses:
   *        default:
   *         description: Register user success
   */

  /**
   * REGISTER USER
   * @param {*} args
   * @param {*} opts
   */
  this.registerUser = async function (args, opts) {
    const { logUtils } = opts;

    const loggerFactory = logUtils.createLogger('story-book-api', 'registerUser');

    try {
      loggerFactory.debug(`Function registerUser has been start`, {
        args: args,
      });

      // check duplicate email
      const isDuplicateEmail = await checkDuplicateEmail(args.email, dataMongoStore);

      if (isDuplicateEmail) {
        throw errorManager.errorBuilder('DuplicateEmailRegister');
      }

      const fullName = `${args.lastName} ${args.firstName}`;
      const slugName = slugUtils.parseSlug(fullName);

      const isDuplicateSlug = await checkDuplicateSlug(slugName, dataMongoStore);

      if (isDuplicateSlug) {
        throw errorManager.errorBuilder('DuplicateSlugRegister');
      }

      args.slug = slugName;

      // Hash Password
      let password = '';
      let passwordConfirm = '';
      if (isEmpty(args.password)) {
        password = '123';
        passwordConfirm = '123';
      } else {
        password = args.password;
        passwordConfirm = args.passwordConfirm;
      }

      if (isEmpty(args.permissions)) {
        args.permissions = ['USER'];
      }

      if (!isEqual(password, passwordConfirm)) {
        throw errorManager.errorBuilder('PasswordConfirmNotMatch');
      }

      const salt = await bcrypt.genSalt(10);
      args.password = await bcrypt.hash(password, salt);
      args.passwordConfirm = await bcrypt.hash(passwordConfirm, salt);

      await dataMongoStore.create({
        type: 'UserModel',
        data: args,
      });

      loggerFactory.info(`Function registerUsers has been end`);

      return { message: 'RegisterUserMessage' };
    } catch (err) {
      loggerFactory.error(`Function registerUsers has error`, {
        args: err,
      });
      return Promise.reject(err);
    }
  };

  /**
   * @swagger
   * /rest/api/auth/login:
   *   post:
   *      summary: Login User
   *      description: Welcome to login user
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                      email:
   *                        type: string
   *                        default: admin@gmail.com
   *                      password:
   *                        type: string
   *                        default: 123
   *      responses:
   *        default:
   *         description: Login success
   */

  /**
   * LOGIN USER
   * @param {*} args
   * @param {*} opts
   */
  this.loginUser = async function (args, opts) {
    const { logUtils } = opts;

    const loggerFactory = logUtils.createLogger('story-book-api', 'loginUser');

    try {
      loggerFactory.info(`Function loginUser has been start`, {
        args: args,
      });

      if (isEmpty(args.email)) {
        throw errorManager.errorBuilder('EmailRequired');
      }

      if (isEmpty(args.password)) {
        throw errorManager.errorBuilder('PasswordRequired');
      }
      /**
       * get user login
       */
      const userLogin = await dataMongoStore.findOne({
        type: 'UserModel',
        filter: {
          email: args.email,
          deleted: false,
        },
        projection: {
          _id: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
          permissions: 1,
          password: 1,
          photoURL: 1,
        },
      });

      if (!userLogin) {
        throw errorManager.errorBuilder('EmailNotFound');
      }
      /**
       * compare password
       */
      const validPass = await bcrypt.compare(args.password, userLogin.password);
      if (!validPass) {
        throw errorManager.errorBuilder('IncorrectPassword');
      }

      const userData = convertUserResponse(userLogin);

      /**
       * create token
       */
      const accessToken = tokenGenerator.signToken({
        payload: userData,
        signOptions: {
          jwtid: uuidUtils.v1,
          expiresIn: options.tokenOptions.expiresIn
        },
      });

      // authentication
      const auth = {
        expires_in: options.tokenOptions.expiresIn,
        permissions: userData.permissions,
      };

      const res = {
        result: {
          auth: auth,
          user: {
            emailUser: userData.emailUser,
            fullName: userData.fullName,
            photoURL: userData.photoURL,
          },
        },
        accessToken: accessToken,
        message: 'LoginUserMessage',
      };

      loggerFactory.info('Function loginUser has been end');

      return res;
    } catch (err) {
      loggerFactory.error(`Function loginUser has error`, {
        args: err.message,
      });
      return Promise.reject(err);
    }
  };

  /**
   * @swagger
   * /rest/api/auth/refreshToken:
   *   post:
   *      summary: Refresh token
   *      description: Welcome to refresh token user
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                      refreshToken:
   *                        type: string
   *      responses:
   *        default:
   *         description: Refresh token success
   */

  /**
   * REFRESH TOKEN
   * @param {*} args
   * @param {*} opts
   */
  this.refreshTokenHandler = async function (args, opts) {
    const { logUtils } = opts;

    const loggerFactory = logUtils.createLogger('story-book-api', 'refreshTokenHandler');

    try {
      loggerFactory.info(`Function refreshTokenHandler start with args`, {
        args: args,
      });

      const { newToken, payload } = tokenGenerator.refreshToken({
        token: args.accessToken,
        refreshOptions: {
          jwtid: uuidUtils.v1,
          expiresIn: options.tokenOptions.expiresIn
        },
      });

      // authentication
      const auth = {
        expires_in: options.tokenOptions.expiresIn,
        permissions: payload.permissions,
      };

      const res = {
        result: {
          auth: auth,
          user: {
            emailUser: payload.emailUser,
            fullName: payload.fullName,
            photoURL: payload.photoURL,
          },
        },
        accessToken: newToken,
        message: 'RefreshTokenMessage',
      };

      loggerFactory.info(`Function refreshTokenHandler end`);

      return res;
    } catch (err) {
      loggerFactory.error(`Function refreshToken has error`, {
        args: err.message,
      });
      return Promise.reject(err);
    }
  };

  /**
   * REFRESH TOKEN
   * @param {*} args
   * @param {*} opts
   */
  this.logoutUser = async function (args, opts) {
    const { logUtils } = opts;

    const loggerFactory = logUtils.createLogger('story-book-api', 'logoutUser');
    try {
      loggerFactory.debug(`Function logoutUser start with args`, {
        args: args,
      });
    } catch (err) {
      loggerFactory.error(`Function logoutUser has error`, {
        args: err,
      });
      return Promise.reject(err);
    }
  };
}

async function checkDuplicateEmail(email, dataMongoStore) {
  const isDuplicate = await dataMongoStore.count({
    type: 'UserModel',
    filter: {
      email: email,
    },
  });

  return isDuplicate >= 1 ? true : false;
}

async function checkDuplicateSlug(slug, dataMongoStore) {
  const isDuplicate = await dataMongoStore.count({
    type: 'UserModel',
    filter: {
      slug: slug,
    },
  });

  return isDuplicate >= 1 ? true : false;
}

function convertUserResponse(userLogin) {
  const response = {};

  if (!isEmpty(userLogin)) {
    userLogin = userLogin.toJSON();
    response.id = userLogin._id;
    response.emailUser = userLogin.email;
    response.fullName = `${userLogin.lastName.trim()} ${userLogin.firstName.trim()}`;
    response.permissions = userLogin.permissions;
    response.photoURL = userLogin.photoURL;

    delete userLogin._id;

    return response;
  }

  return response;
}

UserService.reference = {
  dataMongoStore: 'app-repo-store/dataMongoStore',
  dataSequelizeStore: 'app-repo-store/dataSequelizeStore',
  errorManager: 'app-error-manager/errorManager',
};

exports = module.exports = new UserService();
exports.register = UserService;
