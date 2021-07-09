import ProductService from "../services/productService";
import path from "path";
import fs from "fs";
import { Response } from "express";
import AppError from "../utils/appError";
import { Excel } from "../spreadsheet/excel";

export class Download {
  private async saveFile() {
    const products = await ProductService.getAllPendingProducts();

    if (products) {
      new Excel(products).save();
      ProductService.updateProducts();
    }
  }

  private getPath() {
    const filePath = path.join(__dirname, "../../summary-data.xlsx");

    if (!fs.existsSync(filePath)) throw new AppError("File not found.", 404);

    return filePath;
  }

  async getStream(response: Response) {
    await this.saveFile();

    const path = this.getPath();
    const stat = fs.statSync(path);

    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "summary-data.xlsx"
    );
    response.setHeader("Content-Length", stat.size);

    return fs.createReadStream(path);
  }
}
