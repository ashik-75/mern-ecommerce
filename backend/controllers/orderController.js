const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ updatedAt: -1 });
  res.json(orders);
});

const addOrder = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    shippingPrice,
    totalPrice,
    isPaid,
    isDelivered,
    orderItems,
    shippingAddress,
    paymentMethod,
  } = req.body;
  const order = await Order.create({
    user: req.user._id,
    shippingPrice,
    totalPrice,
    isPaid,
    isDelivered,
    orderItems,
    shippingAddress,
    paymentMethod,
  });

  res.json(order);
});

const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderByPay = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    await order.save();

    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderbyDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getOrdersByUser = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("user")
    .sort({ updatedAt: -1 });
  if (orders?.length > 0) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("order is Empty");
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  res.json(order);
});

module.exports = {
  getAllOrder,
  addOrder,
  getSingleOrder,
  updateOrderByPay,
  updateOrderbyDelivered,
  updateOrderbyDelivered,
  getOrdersByUser,
  deleteOrder,
};
