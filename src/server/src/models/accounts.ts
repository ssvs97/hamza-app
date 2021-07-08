import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Account = mongoose.model("Account", accountSchema);
