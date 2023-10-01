const Product = require('../models/product');

const getAllProducts = async function (req, res) {
  const products = await Product.find();
  if (!products) return res.status(204).json({ message: 'No Products found.' });
  return res.json(products);
};

const createNewProduct = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'Product id are required' });
  }

  try {
    const result = await Product.create({
      id: req.body.id,
      imageUrl: req.body.imageUrl,
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return err;
  }
};

const updateProduct = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required.' });
  }

  const product = await Product.findOne({ id: req.body.id }).exec();
  if (!product) {
    return res.status(204).json({ message: `No Product matches ID ${req.body.id}.` });
  }
  if (req.body?.imageUrl) product.imageUrl = req.body.imageUrl;
  const result = await product.save();
  return res.json(result);
};

const deleteProduct = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: 'Product ID required.' });

  const product = await Product.findOne({ id: req.body.id }).exec();
  if (!product) {
    return res.status(204).json({ message: `No Product matches ID ${req.body.id}.` });
  }
  const result = await Product.deleteOne({ id: req.body.id });
  return res.json(result);
};

const getProduct = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: 'Product ID required.' });
  console.log(req.params.id);
  const product = await Product.findOne({ id: req.params.id }).exec();
  if (!product) {
    return res.status(204).json({ message: `No Product matches ID ${req.params.id}.` });
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
