const Coupon = require('../models/coupon');

const validateCoupon = async (req, res) => {
  if (!req?.params?.code) {
    return res.status(400).json({ message: 'coupon code parameter is required.' });
  }

  const coupon = await Coupon.findOne({ code: req.params?.code }).exec();
  if (!coupon) {
    return res.status(204).json({ message: `No Coupon matches code ${req.params?.code}.` });
  }

  return res.json({ discount: coupon.discount });
};

const createCoupon = async (req, res) => {
  if (!req?.body?.code || !req?.body?.discount) {
    return res.status(400).json({ message: 'Coupon code/discount are required' });
  }

  try {
    const result = await Coupon.create({
      code: req.body.code,
      discount: req.body.discount,
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return err;
  }
};

exports.validateCoupon = validateCoupon;
exports.createCoupon = createCoupon;
