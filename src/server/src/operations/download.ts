import ProductService from "../services/productService";
import { join } from "path";
import { existsSync, statSync, createReadStream } from "fs";
import { Response } from "express";
import AppError from "../utils/appError";
import { Excel } from "../spreadsheet/excel";
import { parallel } from "async";

export class Download {
  private async saveFile() {
    const products = await ProductService.getAllPendingProducts();

    if (products) {
      const excel = new Excel(products);
      parallel([
        () => excel.serverSave(),
        () => excel.googleSave(),
        () => ProductService.updateProducts(),
      ]);
    }
  }

  private getPath() {
    const filePath = join(__dirname, "../../summary-data.xlsx");

    if (!existsSync(filePath)) throw new AppError("File not found.", 404);

    return filePath;
  }

  async getStream(response: Response) {
    await this.saveFile();

    const path = this.getPath();
    const stat = statSync(path);

    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "summary-data.xlsx"
    );
    response.setHeader("Content-Length", stat.size);

    return createReadStream(path);
  }
}
