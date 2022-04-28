'use strict';

const RoleModel = require('./models/role-model');
const UserModel = require('./models/user-model');
const BoardModel = require('./models/board-model');

const models = [
  RoleModel,
  UserModel,
  BoardModel
];

module.exports = models;
