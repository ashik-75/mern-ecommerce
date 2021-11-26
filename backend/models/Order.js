const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
      required: true,
    },
    deliveredAt: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    shippingAddress: {
      id: Number,
      name: String,
      phone: String,
      alternativePhone: String,
      address: String,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: String,
        category: String,
        price: Number,
        image: String,
        qty: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
