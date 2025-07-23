const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoute.js')

app.use(express.json());
app.use('/auth', authRoutes)

try {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
} catch (err) {
  console.error('Failed to start server:', err);
}