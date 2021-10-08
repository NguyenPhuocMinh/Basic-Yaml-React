'use strict';

const HomeMapping = require('./router/home-mapping');
const UserMappings = require('./router/user-mapping');
const ContactMappings = require('./router/contact-mapping');
const HealthCheckMappings = require('./router/health-check-mapping');

const mappings = [
  ...HomeMapping,
  ...UserMappings,
  ...ContactMappings,
  ...HealthCheckMappings
];

module.exports = mappings;
