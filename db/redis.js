var _ = require('lodash');
var redis = require('redis');

module.exports = function client (config) {

  var redisConfig = config && config.redis ? config.redis : {};
  redisConfig = _.defaults(config && config.redis || {}, { host: 'localhost', port: 6379, options: { } });
  redisConfig.options.retry_max_delay = redisConfig.options.retry_max_delay || 10000;

  var redisClient = redis.createClient(redisConfig.port, redisConfig.host, redisConfig.options);

  redisClient.on('error', function (err) {
    console.error('Error connecting to redis [%s:%s] - %s', redisConfig.host, redisConfig.port, err.message);
  });

  redisClient.on('ready', function () {
    // Do nothing - assume success unless proven otherwise
  });

  redisClient.select(redisConfig.db || 0);

  return redisClient;

};
