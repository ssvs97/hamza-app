import ProductService from "../services/productService";
import path from "path";
import fs from "fs";
import { NextFunction, Response } from "express-serve-static-core";
import AppError from "../utils/appError";
import { Excel } from "../spreadsheet/excel";

export class Download {
  private filePath: any;
  constructor(private next: NextFunction) {
    this.saveFile();
    this.filePath = this.getPath();
  }

  private async saveFile() {
    const products = await ProductService.getAllPendingProducts();

    if (products) {
      new Excel(products).save();
      ProductService.updateProducts();
    }
  }

  private getPath() {
    const filePath = path.join(__dirname, "../../summary-data.xlsx");

    if (!fs.existsSync(filePath))
      return this.next(new AppError("File not found.", 404));

    return filePath;
  }

  getStream(response: Response) {
    const stat = fs.statSync(this.filePath);

    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "summary-data.xlsx"
    );
    response.setHeader("Content-Length", stat.size);

    return fs.createReadStream(this.filePath);
  }
}
