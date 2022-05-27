'use strict';

const winext = require('winext');
const dotenv = winext.require('dotenv');
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const contextPath = process.env.CONTEXT_PATH;
const clientUIPath = process.env.CLIENT_UI_PATH;
const docsPath = process.env.DOCS_PATH;

const serverHost = process.env.SERVER_HOST;
const serverPort = process.env.SERVER_PORT;

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoName = process.env.MONGO_DATABASE;

const sqlHost = process.env.SQL_HOST;
const sqlPort = process.env.SQL_PORT;
const sqlUser = process.env.SQL_USER;
const sqlPassword = process.env.SQL_PASSWORD;
const sqlName = process.env.SQL_DATABASE;

const graphqlPath = process.env.GRAPHQL_PATH;

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisUsername = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;

const kongAdminProt = process.env.KONG_ADMIN_PORT;

const consultHost = process.env.CONSUL_HOST;
const consultPort = process.env.CONSUL_PORT;

const serviceID = process.env.SERVICE_ID;
const serviceName = process.env.SERVICE_NAME;

const profiles = {
  isProduction,
  contextPath,
  clientUIPath,
  docsPath,
  serverHost,
  serverPort,
  mongoHost,
  mongoPort,
  mongoUser,
  mongoPassword,
  mongoName,
  sqlHost,
  sqlPort,
  sqlUser,
  sqlPassword,
  sqlName,
  graphqlPath,
  redisHost,
  redisPort,
  redisUsername,
  redisPassword,
  kongAdminProt,
  consultHost,
  consultPort,
  serviceID,
  serviceName,
};

module.exports = profiles;
