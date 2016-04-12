'use strict';

import nconf from 'nconf';

const appName = require('../../package.json').name;
const isProduction = process.env.NODE_ENV === 'production';
const port =  process.env.PORT || 3000;

// Specifying an env delimiter allows us to override config when shipping to
// production server. 'foo__bar=2 gulp' will set config to '{foo: {bar: 2}}'
 nconf.env().file('options',__dirname +'/secrets.json');

// For local development with secrets. Check src/common/_secrets.json file.
// Remember, never put secrets in default config.
// Use environment variables for production, and secrets.json for development.
nconf.defaults({
  appName,
  isProduction,
  host: 'localhost:' + port,
  port: port
});

export default nconf.get();