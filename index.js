const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'your-secret-key';

// Замените эту функцию на реальную аутентификацию пользователя
function authenticateUser(username, password) {
  return username === 'user' && password === 'password';
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  if (authenticateUser(username, password)) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
