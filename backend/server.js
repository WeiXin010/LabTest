const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5555;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../frontend')));

// Fake user
const USER = {
  username: 'admin',
  password: 'password123'
};

// Routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    return res.redirect('http://frontend-server/welcome.html');
  } else {
    return res.send('<h2>Login failed. <a href="/">Try again</a></h2>');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
