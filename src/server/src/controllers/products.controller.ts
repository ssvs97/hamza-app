import { NextFunction, Request, Response } from "express";
import ProductService from "../services/productService";
import AppError from "../utils/appError";
import { UniqueProducts } from "../operations/uniqueProducts";
import { Download } from "../operations/download";
import { Joi } from "../utils/joi";

export default class Product {
  static async saveUniqueProducts(
    request: Request,
    response: Response,
    _: NextFunction
  ) {
    const productsInput = request.body;
    const accountNumber = Object.keys(productsInput)[0];

    const joi = Joi.getInstance();
    await joi.saveProductsSchema.validateAsync(productsInput[accountNumber]);

    const uniqueProducts = new UniqueProducts(productsInput, accountNumber);

    const overview = await uniqueProducts.save();
    uniqueProducts.saveAccount();

    response.send(overview);
  }

  static async getTodayProducts(
    _: Request,
    response: Response,
    _2: NextFunction
  ) {
    const products = await ProductService.getTodayProducts();

    response.send(products);
  }

  static async getPendingProducts(
    _: Request,
    response: Response,
    _2: NextFunction
  ) {
    const products = await ProductService.getPendingProducts();

    response.send(products);
  }

  static async moreInformationProducts(
    _: Request,
    response: Response,
    next: NextFunction
  ) {
    const products = await ProductService.getMoreInformationProducts();

    if (products.length == 0) return next(new AppError("No data found.", 404));

    response.send(products);
  }

  static async downloadPendingProducts(
    _: Request,
    response: Response,
    _2: NextFunction
  ) {
    const download = new Download();
    const readStream = await download.getStream(response);
    readStream.pipe(response);
  }
}
