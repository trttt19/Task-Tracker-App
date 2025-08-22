const envalid = require('envalid');
if (process.env.NODE_ENV === 'test') {
  module.exports = {
    ACCESS_TOKEN_SECRET: "test_secret",
    DATABASE_USER: "test_user",
    DATABASE_PASS: "test_pass",
    DATABASE_NAME: "test_db",
    DATABASE_HOST: "localhost",
    DATABASE_DIALECT: "sqlite",
  };
} else {
  module.exports = envalid.cleanEnv(process.env, {
    ACCESS_TOKEN_SECRET: envalid.str(),
    DATABASE_USER: envalid.str(),
    DATABASE_PASS: envalid.str(),
    DATABASE_NAME: envalid.str(),
    HOST: envalid.host({ default: '127.0.0.1' }),
    LOG_LEVEL: envalid.str({ default: 'http' })
  })
}
