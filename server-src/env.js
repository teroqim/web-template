const DEFAULT_EXPRESS_PORT = 5000;

var EnvEnum = {
  DEBUG: 'debug',
  STAGING: 'staging',
  PROD: 'production'
};

var current = process.env.ENVIRONMENT || EnvEnum.DEBUG;
var env = {
  assetBaseUrl: '',
  current: current,
  isDebug: current === EnvEnum.DEBUG,
  isProduction: current === EnvEnum.PROD,
  isStaging: current === EnvEnum.STAGING,
  runPort: process.env.PORT || DEFAULT_EXPRESS_PORT,
  webpackDevServerPort: 9090,
}

// Determine site base url
var hostUrl = 'http://localhost:' + env.runPort
if (env.isProduction) {
  hostUrl = 'http://www.example.com'
}
env.hostUrl = hostUrl;


module.exports = env;
