import { counter } from "../interfaces/Interfaces";

export class Counter {
  private counter: counter;

  constructor() {
    this.counter = this.setIntial();
  }

  private setIntial(items = 0) {
    return { items, totalPrice: 0 };
  }

  update(productName: string, productPrice: string) {
    this.increase(productPrice);

    if (this.isProductExist(this.counter[productName]))
      return this.counter[productName]++;
    this.counter[productName] = 1;
  }

  private isProductExist(productName: number) {
    return productName != undefined;
  }

  private increase(productPrice: string) {
    this.counter.items++;
    this.counter.totalPrice += +productPrice;
  }

  get overview() {
    return this.counter;
  }
}
