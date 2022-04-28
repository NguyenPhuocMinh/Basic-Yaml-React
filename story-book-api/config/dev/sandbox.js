'use strict';

const winext = require('winext');
const dotenv = winext.require('dotenv');
const ip = winext.require('ip');
const YAML = winext.require('yamljs');
const path = require('path');
const routerMappings = require('../../src/mappings');
const enablePaths = require('../data/enablePaths');
const publicPaths = require('../data/publicPaths');
const protectedPaths = require('../data/protectedPaths');
const errorCodes = require('../data/errorCodes');
const messageCodes = require('../data/messageCodes');
const secret = require('../data/secret');
const address = ip.address();
dotenv.config();

const contextPath = process.env.CONTEXT_PATH;

module.exports = {
  application: {
    dependencies: {
      winext_logger: {
        winston: {
          levels: {
            error: 0,
            debug: 1,
            warn: 2,
            data: 3,
            info: 4,
          },
          colors: {
            error: 'bold red',
            debug: 'bold blue',
            warn: 'bold yellow',
            data: 'bold magenta',
            info: 'bold green',
          },
        },
        log4js: {
          appenders: {
            out: { type: 'stdout' },
          },
          categories: {
            default: {
              appenders: ['out'],
              level: 'debug',
            },
          },
        },
      },
      winext_api_gateway: {
        kong: {
          enable: false, // disable kong
          port: process.env.KONG_ADMIN_PORT || 8001,
          service: {
            name: process.env.SERVICE_NAME,
            url: `http://${address}:${process.env.SERVER_PORT}/rest/api/`,
          },
          route: {
            name: process.env.SERVICE_NAME,
            service: {
              name: process.env.SERVICE_NAME,
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
              name: process.env.SERVICE_NAME,
            },
          },
        },
      },
      winext_service_registry: {
        consul: {
          enable: false, // disable consul
          init: {
            host: process.env.CONSUL_HOST || address,
            port: process.env.CONSUL_PORT || 8500, // default port for consul
            promisify: true,
          },
          register: {
            id: process.env.SERVICE_ID,
            name: process.env.SERVICE_NAME,
            port: process.env.PORT || 8081,
            check: {
              http: `http://${process.env.CONSUL_HOST || address}:${process.env.SERVER_PORT}${contextPath}/healths`,
              interval: '10s',
              timeout: '3s',
            },
          },
        },
      },
      winext_repo_store: {
        mongoose: {
          enable: false, // enable false for local
          host: process.env.MONGO_HOST,
          port: process.env.MONGO_PORT,
          user: process.env.MONGO_USER,
          password: process.env.MONGO_PASSWORD,
          name: process.env.MONGO_DATABASE,
        },
        graphql: {
          enable: true, // enable true for start
          path: process.env.GRAPHQL_PATH,
          enableGraphiql: true,
          mocks: false, // true for default mocking || see https://www.apollographql.com/docs/apollo-server/testing/mocking
        },
      },
      winext_authorization: {
        enable: true, // enable false for disable check token
        secretKey: secret.tokenSecret,
        contextPath: contextPath,
        enablePaths: enablePaths,
        publicPaths: publicPaths,
        protectedPaths: protectedPaths,
      },
      winext_runserver: {
        enable: false, // enable false for local
        contextPath: contextPath,
        pathDocs: process.env.DOCS_PATH,
        port: process.env.SERVER_PORT,
        host: process.env.SERVER_HOST,
        dialectSwagger: 'YAML', // OPTIONS || YAML
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
          username: process.env.REDIS_USERNAME,
          password: process.env.REDIS_PASSWORD,
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: process.env.REDIS_PORT || 6379,
        },
      },
    },
  },
};
