const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoute')
app.use(express.json());
app.use('/tasks', taskRoutes)
// const middleware = require('./middleware/authMiddleware')
// app.get('/task', middleware.authToken, (req, res) => {
//   res.send(req.user.name)
// })

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
