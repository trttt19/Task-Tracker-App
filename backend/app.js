const path = require('path');
if (process.env.NODE_ENV !== "production") {
  const envFile = process.env.NODE_ENV == "development" ? ".env" : ".env.test"
  require('dotenv').config({ path: path.resolve(__dirname, envFile) })
}
const express = require('express');
const app = express();
app.use(express.json());
const authRoutes = require('./routes/authRoute')
const taskRoutes = require('./routes/taskRoute')
const authenticationMiddleware = require('./middleware/authMiddleware')

app.use('/auth', authRoutes)

app.use('/tasks', authenticationMiddleware.authToken, taskRoutes)
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
  });
});
try {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
} catch (err) {
  console.error('Failed to start server:', err);
}
