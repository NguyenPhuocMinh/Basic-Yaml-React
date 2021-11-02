'use strict';

const errorCodes = {
  EmailNotFound: {
    message: 'users.notification.login.email_not_found',
    returnCode: 3001,
    statusCode: 404
  },
  DuplicateEmailRegister: {
    message: 'users.notification.register.duplicate_email',
    returnCode: 3001,
    statusCode: 409
  },
  InValidPassword: {
    message: 'Password invalid',
    returnCode: 3002,
    statusCode: 400
  },
  RefreshTokenInvalid: {
    message: 'RefreshToken invalid',
    returnCode: 3003,
    statusCode: 400
  },
  PasswordConfirmNotMatch: {
    message: 'Password confirm not match current password',
    returnCode: 3004,
    statusCode: 400
  }
};

module.exports = errorCodes;
