import { Product } from "../models/products";
import { getDate, getNow } from "../utils/date";
import { product } from "../interfaces/Interfaces";

export default class ProductService {
  static async getAllProducts() {
    return await Product.find();
  }

  static async getProductByVoucherCode(voucherCode: string) {
    return await Product.findOne({
      voucherCode,
    });
  }

  static async getTodayProducts() {
    const [start, end] = getDate();
    const products = await Product.aggregate([
      {
        $match: {
          date: {
            $gte: start,
            $lt: end,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$productPrice" },
          items: { $sum: 1 },
        },
      },
    ]);
    if (products.length == 0) products.push(this.setIntialCounter());
    return products[0];
  }

  static async getAllPendingProducts() {
    return await Product.find({ isDownloaded: false });
  }

  static async getPendingProducts() {
    const products = await Product.aggregate([
      {
        $match: { isDownloaded: false },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$productPrice" },
          items: { $sum: 1 },
        },
      },
    ]);
    if (products.length == 0) products.push(this.setIntialCounter());
    return products[0];
  }

  static async getMoreInformationProducts() {
    return await Product.aggregate([
      {
        $match: { isDownloaded: false },
      },
      {
        $group: {
          _id: "$productName",
          totalPrice: { $sum: "$productPrice" },
          items: { $sum: 1 },
        },
      },
    ]);
  }

  static async updateProducts() {
    await Product.updateMany({ isDownloaded: false }, { isDownloaded: true });
  }

  static async saveProduct(data: product, accountNumber: string) {
    return await new Product({
      ...data,
      accountNumber,
      date: getNow(),
    }).save();
  }

  static setIntialCounter(items = 0) {
    return { items, totalPrice: 0 };
  }
}
