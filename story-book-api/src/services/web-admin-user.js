'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const jwt = require('winext-authorization').jwt;
const bcrypt = require('bcryptjs');
const dataSecret = require('../../config/data/secret');
const { isEmpty, get, isEqual } = lodash;

function UserService(params = {}) {
  const { dataStore, errorManager } = params;

  /**
   * @swagger
   * /rest/api/register:
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
    const { loggerFactory, requestId } = opts;

    try {
      loggerFactory.debug(`function registerUser begin`, {
        requestId: `${requestId}`,
        args: args
      });

      // check duplicate email
      const isDuplicateEmail = await checkDuplicateEmail(args.email, dataStore);

      if (isDuplicateEmail) {
        throw errorManager.errorBuilder('DuplicateEmailRegister');
      }

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
      };

      const salt = await bcrypt.genSalt(10);
      args.password = await bcrypt.hash(password, salt);
      args.passwordConfirm = await bcrypt.hash(passwordConfirm, salt);

      await dataStore.create({
        type: 'UserModel',
        data: args
      });

      return { message: 'Register user successfully!' };
    } catch (err) {
      loggerFactory.error(`function registerUsers has error : ${err}`, { requestId: `${requestId}` });
      return Promise.reject(err);
    }
  };

  /**
   * @swagger
   * /rest/api/login:
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
    const { loggerFactory, requestId } = opts;

    try {
      loggerFactory.debug('function loginUser', {
        requestId: `${requestId}`,
        args: args
      });

      /**
       * get user login
       */
      const userLogin = await dataStore.findOne({
        type: 'UserModel',
        filter: {
          email: args.email
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
        throw errorManager.errorBuilder('InValidPassword');
      }
      /**
       * create token
       */
      const accessToken = jwt.sign({ userLogin }, dataSecret.tokenSecret, {
        expiresIn: dataSecret.tokenLife
      });
      /**
       * create refresh token
       */
      const refreshToken = jwt.sign({ userLogin }, dataSecret.refreshTokenSecret, {
        expiresIn: dataSecret.refreshTokenLife
      });

      loggerFactory.debug('function loginUser end', {
        requestId: `${requestId}`,
        args: {
          accessToken,
          refreshToken
        }
      });
      // authentication
      const auth = {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: dataSecret.tokenLife,
        permissions: userLogin.permissions
      };
      // user info
      return { auth };
    } catch (err) {
      loggerFactory.error(`function loginUser has error`, {
        requestId: `${requestId}`,
        args: { err }
      });
      return Promise.reject(err);
    }
  };

  /**
   * @swagger
   * /rest/api/user/refreshTokens:
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
    const { loggerFactory, requestId } = opts;
    /**
     * get refreshToken from client
     */
    const { refreshToken } = args;

    try {
      loggerFactory.debug(`function refreshTokenHandler start with args`, {
        requestId: `${requestId}`,
        args: { refreshToken }
      });

      if (isEmpty(refreshToken)) {
        throw errorManager.errorBuilder('RefreshTokenInvalid');
      }

      let userLogin;
      let newAccessToken;
      let newRefreshToken;

      await jwt.verify(refreshToken, dataSecret.refreshTokenSecret, (err, decoded) => {
        if (!isEmpty(decoded)) {
          userLogin = get(decoded, 'userLogin');
          /**
           * post new token
           */
          newAccessToken = jwt.sign({ userLogin }, dataSecret.tokenSecret, {
            expiresIn: dataSecret.tokenLife
          });
          /**
           * post new refresh token
           */
          newRefreshToken = jwt.sign({ userLogin }, dataSecret.refreshTokenSecret, {
            expiresIn: dataSecret.refreshTokenLife
          });
        } else {
          throw new Error(err.message);
        }
      });

      loggerFactory.debug(`function refreshTokenHandler end with args`, {
        requestId: `${requestId}`,
        args: {
          newAccessToken,
          refreshToken
        }
      });

      const auth = {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: dataSecret.tokenLife,
        permissions: userLogin.permissions,
      };

      return { auth };
    } catch (err) {
      loggerFactory.error(`function refreshToken has error`, {
        requestId: `${requestId}`,
        args: { err }
      });
      return Promise.reject(err);
    }
  };
}

async function checkDuplicateEmail(email, dataStore) {
  const isDuplicate = await dataStore.count({
    type: 'UserModel',
    filter: {
      email: email
    }
  });

  return isDuplicate >= 1 ? true : false;
}

UserService.reference = {
  dataStore: 'app-repository/dataStore',
  dataSequelize: 'app-repository/dataSequelize',
  errorManager: 'app-error-manager/errorManager'
};

exports = module.exports = new UserService();
exports.register = UserService;
