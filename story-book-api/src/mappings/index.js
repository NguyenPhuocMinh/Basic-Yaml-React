'use strict';

const HomeMapping = require('./router/home-mapping');
const UserMappings = require('./router/user-mapping');
const ContactMappings = require('./router/contact-mapping');
const HealthCheckMappings = require('./router/health-check-mapping');
const BoardMappings = require('./router/board-mapping');

const mappings = [
  ...HomeMapping,
  ...UserMappings,
  ...ContactMappings,
  ...HealthCheckMappings,
  ...BoardMappings,
];

module.exports = mappings;
