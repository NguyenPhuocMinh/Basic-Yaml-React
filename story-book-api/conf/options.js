'use strict';

const sequelizeOptions = {
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const dialectSwagger = 'YAML';

const tokenOptions = {
  expiresIn: 86400,
};

const redisExpired = 300;

const options = {
  sequelizeOptions,
  dialectSwagger,
  tokenOptions,
  redisExpired,
};

module.exports = options;
