const { user } = require('./models');

(async () => {
  try {
    await user.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    });

    console.log('User inserted successfully');
  } catch (error) {
    console.error('Error inserting into the database:', error);
  }
})();
