const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoute')
app.use(express.json());
app.use('/auth', authRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
