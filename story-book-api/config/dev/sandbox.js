'use strict';

const path = require('path');
const winext = require('winext');
const ip = winext.require('ip');
const YAML = winext.require('yamljs');
const address = ip.address();

const routerMappings = require('../../src/mappings');
const enablePaths = require('../data/enablePaths');
const publicPaths = require('../data/publicPaths');
const protectedPaths = require('../data/protectedPaths');
const errorCodes = require('../data/errorCodes');
const messageCodes = require('../data/messageCodes');

const profiles = require('../../conf/profiles');
const options = require('../../conf/options');

module.exports = {
  application: {
    dependencies: {
      winext_logger: {},
      winext_api_gateway: {
        kong: {
          enable: false, // disable kong
          port: profiles.kongAdminProt || 8001,
          service: {
            name: profiles.serviceName,
            url: `http://${address}:${profiles.serverPort}/rest/api/`,
          },
          route: {
            name: profiles.serviceName,
            service: {
              name: profiles.serviceName,
            },
            hosts: [address],
            paths: ['/user-service'],
            methods: ['GET', 'POST'],
          },
          consumer: {
            username: 'Minh',
          },
          plugin: {
            name: 'key-auth',
            config: {
              key_names: ['x-gateway-key'],
              key_in_header: true,
              key_in_body: false,
              key_in_query: false,
            },
            route: {
              name: profiles.serviceName,
            },
          },
        },
      },
      winext_service_registry: {
        consul: {
          enable: false, // disable consul
          init: {
            host: profiles.consultHost || address,
            port: profiles.consultPort || 8500, // default port for consul
            promisify: true,
          },
          register: {
            id: profiles.serviceID,
            name: profiles.serviceName,
            port: profiles.serverPort || 8081,
            check: {
              http: `http://${profiles.consultHost || address}:${profiles.serverPort}${profiles.contextPath}/healths`,
              interval: '10s',
              timeout: '3s',
            },
          },
        },
      },
      winext_repo_store: {
        mongoose: {
          enable: false, // enable false for local
          host: profiles.mongoHost,
          port: profiles.mongoPort,
          user: profiles.mongoUser,
          password: profiles.mongoPassword,
          name: profiles.mongoName,
        },
        mysql: {
          enable: true, // enable true for start
          host: profiles.sqlHost,
          port: profiles.sqlPort,
          user: profiles.sqlUser,
          password: profiles.sqlPassword,
          name: profiles.sqlName,
          sequelizeOptions: options.sequelizeOptions,
        },
        graphql: {
          enable: true, // enable true for start
          path: profiles.graphqlPath,
          enableGraphiql: true,
          mocks: false, // true for default mocking || see https://www.apollographql.com/docs/apollo-server/testing/mocking
        },
      },
      winext_authorization: {
        enable: true, // enable false for disable check token
        contextPath: profiles.contextPath,
        enablePaths: enablePaths,
        publicPaths: publicPaths,
        protectedPaths: protectedPaths,
      },
      winext_runserver: {
        enable: false, // enable false for local
        contextPath: profiles.contextPath,
        clientUIPath: profiles.clientUIPath,
        pathDocs: profiles.docsPath,
        port: profiles.serverPort,
        host: profiles.serverHost,
        dialectSwagger: options.dialectSwagger, // OPTIONS || YAML
        swaggerOptions: {
          definition: {
            openapi: '3.0.0',
            info: {
              title: 'api docs',
              version: '1.0.0',
            },
            components: {
              securitySchemes: {
                bearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
                },
              },
              security: [
                {
                  bearerAuth: [],
                },
              ],
            },
          },
          apis: ['./src/services/*.js'],
        },
        swaggerYaml: YAML.load(path.resolve(__dirname, '../../docs', 'swagger.yaml')),
      },
      winext_error_manager: {
        errorCodes: errorCodes,
      },
      winext_mapping_store: {
        routerMappings: routerMappings,
        messageCodes: messageCodes,
      },
      winext_redis_store: {
        redis: {
          enable: false, // enable false for local
          username: profiles.redisUsername,
          password: profiles.redisPassword,
          host: profiles.redisHost || '127.0.0.1',
          port: profiles.redisPort || 6379,
        },
      },
    },
  },
};
