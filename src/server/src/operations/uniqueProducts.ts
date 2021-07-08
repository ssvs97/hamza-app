import ProductService from "../services/productService";
import { isEmpty } from "../utils/validator";
import { Counter } from "./counter";

export class UniqueProducts {
  private counterObj: Counter;

  constructor(private inputs, private accountNumber) {
    this.counterObj = new Counter();
  }

  async save() {
    const products = this.inputs[this.accountNumber];

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const existProduct = await ProductService.getProductByVoucherCode(
        product.voucherCode
      );

      if (isEmpty(existProduct)) {
        await ProductService.saveProduct(product, this.accountNumber);

        this.counterObj.update(product.productName, product.productPrice);
      }
    }
  }
  extract() {
    return this.counterObj.overview;
  }
}
