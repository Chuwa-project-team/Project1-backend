/* eslint-disable no-unused-vars */
require('dotenv').config();
const Express = require('express');
const cors = require('cors');
const { signup, signin } = require('./handlers/auth.js');
const {
  createNewProduct, updateProduct, deleteProduct, getProduct, getAllProducts,
} = require('./handlers/product.js');
const { loginRequired } = require('./middlewares/auth.js');

const app = Express();
const PORT = process.env.PORT || 3050;

app.use(Express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.path, req.body);
  next();
});
app.post('/api/users/signup', signup);
app.post('/api/users/signin', signin);
app.post('/api/products', createNewProduct);
app.put('/api/product/:name', updateProduct);
app.delete('/api/products', deleteProduct);
app.get('/api/products/:name', loginRequired, getProduct);
app.get('/api/products', getAllProducts);
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
  } else {
    // If no specific error is passed, assume it's a 500 Internal Server Error
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log('Server Listening on port 3050');
});
