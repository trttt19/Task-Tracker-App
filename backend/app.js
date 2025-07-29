console.log('Current NODE_ENV:', process.env.NODE_ENV);
const path = require('path');
if (process.env.NODE_ENV !== "production") {
  const envFile = process.env.NODE_ENV == "development" ? ".env" : ".env.test"
  require('dotenv').config({ path: path.resolve(__dirname, envFile) })
}
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoute')
app.use(express.json());
app.use('/auth', authRoutes)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
