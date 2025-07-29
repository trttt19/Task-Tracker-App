const envalid = require('envalid');

module.exports = envalid.cleanEnv(process.env, {
  ACCESS_TOKEN_SECRET: envalid.str(),
  DATABASE_USER: envalid.str(),
  DATABASE_PASS: envalid.str(),
  DATABASE_NAME: envalid.str(),
  HOST: envalid.host({ default: '127.0.0.1' }),

})
