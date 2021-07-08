import { utils, writeFile } from "xlsx";
import { Google } from "./googleSingleton";
import { formatAMPM } from "../utils/validator";

export class Excel {
  private rows: any;
  private header: any;
  private serverSpreadsheet: any;
  private filePath: string;
  googleSpreadsheet: Google;

  constructor(private products) {
    this.filePath = "src/server/summary-data.xlsx";
    this.serverSpreadsheet = utils.book_new();
    this.googleSpreadsheet = Google.getInstance();
    this.rows = {};
    this.header = {};
    this.p2e();
  }

  private p2e() {
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      if (!this.rows[product.productName]) {
        this.rows[product.productName] = [];
        this.header[product.productName] = [];
      }

      this.pushHeader(product);
      this.pushRow(product);
    }
    return this.header;
  }

  private pushRow(product) {
    const [date, time] = formatAMPM(product.date);
    this.rows[product.productName].push({
      date: date,
      time: time,
      account: product.accountNumber,
      [`${product.productName}/${product.productPrice}`]: product.voucherCode,
    });
  }

  private pushHeader(product) {
    this.header[product.productName].push(
      `${product.productName}/${product.productPrice}`
    );
  }

  async save() {
    const productsName = Object.keys(this.rows);

    for (let i = 0; i < productsName.length; i++) {
      const productRows = this.rows[productsName[i]];
      const productName = productsName[i];

      this.serverSave(productName, productRows);
      await this.googleSave(productName, productRows);
    }
  }

  private serverSave(productName, productRows) {
    const ws = utils.json_to_sheet(productRows);

    utils.book_append_sheet(this.serverSpreadsheet, ws, productName);

    writeFile(this.serverSpreadsheet, this.filePath);
  }

  private async googleSave(productName, productRows) {
    const productHeader = this.header[productName];

    const googleSheet = await this.googleSpreadsheet.spreadsheet.addSheet();

    productHeader.unshift("date", "time", "account");

    const mySet = new Set(productHeader);
    const uniqueHeader = [...mySet];

    await googleSheet.setHeaderRow(uniqueHeader as string[]);
    await googleSheet.addRows(productRows);
  }
}
