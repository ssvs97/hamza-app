const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  productName: {
    type: String,
    trim: true,
    required: true,
  },
  voucherCode: {
    type: String,
    required: true,
    trim: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  isDownloaded: {
    type: Boolean,
    default: false,
  },
});

export const Product = mongoose.model("Product", productSchema);
