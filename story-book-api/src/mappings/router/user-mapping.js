'use strict';

const UserService = require('../../services/web-admin-user');

module.exports = [
  // user register
  {
    pathName: '/auth/register',
    method: 'POST',
    methodName: 'registerUser',
    serviceName: UserService,
    input: {
      transform: function (req) {
        return {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          passwordConfirm: req.body.passwordConfirm,
          permissions: req.body.permissions,
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
  // user login
  {
    pathName: '/auth/login',
    method: 'POST',
    methodName: 'loginUser',
    serviceName: UserService,
    input: {
      transform: function (req, opts) {
        return {
          email: req.body.email,
          password: req.body.password,
          rememberMe: req.body.rememberMe,
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
  // refreshTokens
  {
    pathName: '/auth/refreshToken',
    method: 'POST',
    methodName: 'refreshTokenHandler',
    serviceName: UserService,
    input: {
      transform: function (req) {
        return {
          refreshToken: req.body.refreshToken,
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
