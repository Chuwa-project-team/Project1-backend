require('dotenv').config();
const Express = require('express');
const cors = require('cors');
const { signup, signin } = require('./handlers/auth.js');

const app = Express();
const PORT = process.env.PORT || 3050;

app.use(Express.json());
app.use(cors());
app.post('/api/users/signup', signup);
app.post('/api/users/signin', signin);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => {
  console.log('Server Listening on port 3050');
});
