'use strict';

const winext = require('winext');
const sandbox = require('./config/dev/sandbox');

const app = winext.initializer(sandbox,
  [
    'winext-logger',
    'winext-error-manager',
    'winext-authorization',
    'winext-repo-store',
    'winext-redis-store',
    'winext-mapping-store',
    'winext-service-registry',
    'winext-api-gateway',
    'winext-runserver',
  ],
  {
    mongo: 'story-book-model',
    graphql: 'story-book-model-graphql'
  }
);

if (require.main === module) {
  app.server.start();
  const stopped = function () {
    app.server.stop();
  };
  process.on('SIGINT', stopped);
  process.on('SIGQUIT', stopped);
  process.on('SIGTERM', stopped);
}
