const { sequelize } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();
