'use strict';

module.exports = {
  name: 'UserModel',
  attributes: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    passwordConfirm: { type: String },
    permissions: [String],
    rememberMe: { type: Boolean, default: false },
    photoURL: { type: String },
    //filter
    slug: { type: String },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date },
    createdBy: { type: String },
    updatedAt: { type: Date },
    updatedBy: { type: String },
  },
  options: {
    collection: 'users'
  }
};
