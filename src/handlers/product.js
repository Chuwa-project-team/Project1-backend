const Product = require('../models/product');

const getAllProducts = async function (req, res) {
  console.log('getAllProducts');
  const products = await Product.find();
  if (!products) return res.status(204).json({ message: 'No Products found.' });
  return res.json(products);
};

const createNewProduct = async (req, res) => {
  if (!req?.body?.name) {
    return res.status(400).json({ message: 'Product name are required' });
  }

  try {
    const result = await Product.create({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      category: req.body.category,
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return err;
  }
};

const updateProduct = async (req, res) => {
  if (!req?.params?.name) {
    return res.status(400).json({ message: 'name parameter is required.' });
  }

  const product = await Product.findOne({ name: req.params?.name }).exec();
  if (!product) {
    return res.status(204).json({ message: `No Product matches name ${req.params?.name}.` });
  }
  if (req.body?.price) product.price = req.body.price;
  if (req.body?.description) product.description = req.body.description;
  if (req.body?.category) product.category = req.body.category;
  if (req.body?.quantity) product.quantity = req.body.quantity;
  if (req.body?.imageUrl) product.imageUrl = req.body.imageUrl;
  const result = await product.save();
  return res.json(result);
};

const deleteProduct = async (req, res) => {
  if (!req?.body?.name) return res.status(400).json({ message: 'Product name required.' });

  const product = await Product.findOne({ name: req.body.name }).exec();
  if (!product) {
    return res.status(204).json({ message: `No Product matches name ${req.body.name}.` });
  }
  const result = await Product.deleteOne({ name: req.body.name });
  return res.json(result);
};

const getProduct = async (req, res) => {
  if (!req?.params?.name) return res.status(400).json({ message: 'Product name required.' });
  const product = await Product.findOne({ name: req.params.name }).exec();
  if (!product) {
    return res.status(204).json({ message: `No Product matches name ${req.params.name}.` });
  }
  return res.json(product);
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
