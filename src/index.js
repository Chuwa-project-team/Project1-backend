require('dotenv').config();
const Express = require('express');
const cors = require('cors');
const { signup, signin } = require('./handlers/auth.js');
const {
  createNewProduct, updateProduct, deleteProduct, getProduct,
} = require('./handlers/product.js');

const app = Express();
const PORT = process.env.PORT || 3050;

app.use(Express.json());
app.use(cors());
app.post('/api/users/signup', signup);
app.get('/api/users/signin', signin);
app.post('/api/products', createNewProduct);
app.put('/api/products', updateProduct);
app.delete('/api/products', deleteProduct);
app.get('/api/products/:id', getProduct);
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => {
  console.log('Server Listening on port 3050');
});
