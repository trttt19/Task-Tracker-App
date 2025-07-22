const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

//POST /users
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.user.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /tasks
app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await db.task.create({ title, description, user_id: 1 });
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await db.user.destroy({ where: { user_id: userId } });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
