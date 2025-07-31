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
app.use(express.json());
app.use('/auth', authRoutes)
app.use('/tasks', authenticationMiddleware.authToken, taskRoutes)
// const middleware = require('./middleware/authMiddleware')
// app.get('/task', middleware.authToken, (req, res) => {
//   res.send(req.user.name)
// })


try {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
} catch (err) {
  console.error('Failed to start server:', err);
}
