'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const UserService = require('../../services/web-admin-user');
const profiles = require('../../../conf/profiles');
const { get } = lodash;

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
          setCookies: {
            'X-Access-Token': {
              value: get(response, 'accessToken'),
              options: {
                maxAge: 86400,
                httpOnly: true,
                sameSite: 'strict',
                secure: profiles.isProduction,
              },
            },
          },
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
          accessToken: req.cookies['X-Access-Token'],
        };
      },
    },
    output: {
      transform: function (response) {
        return {
          setCookies: {
            'X-Access-Token': {
              value: get(response, 'accessToken'),
              options: {
                maxAge: 86400,
                httpOnly: true,
                sameSite: 'strict',
                secure: profiles.isProduction,
              },
            },
          },
          body: response,
          message: response.message,
        };
      },
    },
  },
  // user logout
  {
    pathName: '/auth/logout',
    method: 'POST',
    methodName: 'logoutUser',
    serviceName: UserService,
    input: {
      transform: function (req) {
        return {
          email: req.body.email,
          fullName: req.body.fullName,
        };
      },
    },
    output: {
      transform: function (response) {
        return {
          clearCookie: {
            'X-Access-Token': {
              options: {},
            },
          },
          message: response.message,
        };
      },
    },
  },
];
