'use strict';

const messageCodes = {
  HealthCheckMessage: {
    message: 'User service connect consul successfully!',
    returnCode: 1001,
    statusCode: 200,
  },
  HomeMessage: {
    message: 'Welcome home page',
    returnCode: 1002,
    statusCode: 200,
  },
  ContactMessage: {
    message: 'Welcome contact page',
    returnCode: 1003,
    statusCode: 200,
  },
  RegisterUserMessage: {
    message: 'User Login Success',
    returnCode: 1004,
    statusCode: 200,
  },
  LoginUserMessage: {
    message: 'User Login Success',
    returnCode: 1005,
    statusCode: 200,
  },
  RefreshTokenMessage: {
    message: 'Refresh token successfully!',
    returnCode: 1006,
    statusCode: 200,
  },
  BoardMessage: {
    message: 'Get board successfully!',
    returnCode: 1007,
    statusCode: 200,
  },
};

module.exports = messageCodes;
