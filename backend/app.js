const path = require('path');
if (process.env.NODE_ENV !== "production") {
  const envFile = process.env.NODE_ENV == "development" ? ".env" : ".env.test"
  require('dotenv').config({ path: path.resolve(__dirname, envFile) })
}
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoute')
const taskRoutes = require('./routes/taskRoute')
const authenticationMiddleware = require('./middleware/authMiddleware')
const morganMiddleware = require('./middleware/morganMiddleware')
const logger = require('./config/logger')

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(morganMiddleware)
app.use('/auth', authRoutes)
app.use('/tasks', authenticationMiddleware.authToken, taskRoutes)
module.exports = app
if (require.main === module) {
  try {
    app.listen(3000, () => {
      logger.info('Server is running on port 3000');
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
  }
}
