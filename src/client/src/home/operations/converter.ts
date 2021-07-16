import { validateInput } from "../../utils/validator";
import { converter } from "../interfaces/interfaces";
import { PendingProducts } from "../products/pending";
import { TodayProducts } from "../products/today";
import { Template } from "./template";

export class Converter extends Template {
  private textArea: HTMLTextAreaElement;
  private accountId: HTMLInputElement;

  constructor() {
    super(document.querySelector(".convert-button")!);
    this.textArea = document.querySelector(".convert-textarea")!;
    this.accountId = document.querySelector("#account-id")!;
  }

  preRequest() {
    const textArea = this.textArea.value;
    const accountId = this.accountId.value.trim();

    validateInput(accountId, textArea);
    return this.extractData(textArea, accountId);
  }

  async request(data: converter) {
    const url = "/upload-data";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  async operation(response: Response) {
    this.clearText();

    const products = await response.json();
    if (products.items == 0) throw new Error("0 item added");

    const productsName = Object.keys(products);

    let notification = `<span class='green'>${products.items} items added</span>`;
    if (products.items == 1)
      notification = `<span class='green'>${products.items} item added</span>`;

    notification += ` and <span class='numbers'>${products.totalPrice}$</span>.<br>`;

    for (let i = 2; i < productsName.length; i++) {
      const name = productsName[i];
      notification += `<span class="numbers">${products[name]}</span> ${name}.<br>`;
    }
    this.notification(notification);
  }

  private extractData(textArea: string, accountNumber: string) {
    const productTitle = textArea.match(/\$[0-9]+\s[a-z]+/gi);
    const voucherCode = textArea.match(/code:.*/gi);

    if (!productTitle || !voucherCode) throw Error("Invalid Pattern!");

    const data: converter = { [accountNumber]: [] };

    for (let i = 0; i < voucherCode.length; i++) {
      const element = productTitle[i * 2];
      const [price, productName] = element.split(" ");

      data[accountNumber].push({
        productName,
        voucherCode: voucherCode[i].replace("Code: ", "").replace("\t", ""),
        productPrice: price.replace("$", ""),
      });
    }
    return data;
  }

  clearText() {
    this.textArea.value = "";
    this.accountId.value = "";
  }

  display() {
    Promise.all([new TodayProducts().run(), new PendingProducts().run()]);
  }
}
