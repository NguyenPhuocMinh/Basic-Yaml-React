'use strict';

const errorCodes = {
  DuplicateEmailRegister: {
    message: 'users.notification.register.duplicate_email',
    returnCode: 3001,
    statusCode: 409,
  },
  EmailNotFound: {
    message: 'users.notification.login.email_not_found',
    returnCode: 3002,
    statusCode: 404,
  },
  PasswordRequired: {
    message: 'users.notification.login.password_required',
    returnCode: 3003,
    statusCode: 400,
  },
  EmailRequired: {
    message: 'users.notification.login.email_required',
    returnCode: 3004,
    statusCode: 400,
  },
  IncorrectPassword: {
    message: 'users.notification.login.incorrect_password',
    returnCode: 3005,
    statusCode: 400,
  },
  PasswordConfirmNotMatch: {
    message: 'users.notification.register.password_confirm_not_match',
    returnCode: 3006,
    statusCode: 400,
  },
  RefreshTokenNotFound: {
    message: 'users.notification.refresh_token.not_found',
    returnCode: 3007,
    statusCode: 400,
  },
  DuplicateSlugRegister: {
    message: 'users.notification.register.duplicate_slug',
    returnCode: 3008,
    statusCode: 409,
  },
};

module.exports = errorCodes;
