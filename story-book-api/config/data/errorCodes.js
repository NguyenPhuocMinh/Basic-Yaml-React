'use strict';

const errorCodes = {
  DuplicateEmailRegister: {
    message: 'users.notification.register.duplicate_email',
    returnCode: 3001,
    statusCode: 409
  },
  EmailNotFound: {
    message: 'users.notification.login.email_not_found',
    returnCode: 3002,
    statusCode: 404
  },
  IncorrectPassword: {
    message: 'users.notification.login.incorrect_password',
    returnCode: 3003,
    statusCode: 400
  },
  PasswordConfirmNotMatch: {
    message: 'users.notification.register.password_confirm_not_match',
    returnCode: 3004,
    statusCode: 400
  },
  RefreshTokenInvalid: {
    message: 'RefreshToken invalid',
    returnCode: 3005,
    statusCode: 400
  },
};

module.exports = errorCodes;
