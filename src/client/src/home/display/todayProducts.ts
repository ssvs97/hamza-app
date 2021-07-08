import { animateValue } from "../../utils/animateValue";
import { overview } from "../interfaces/interfaces";

export class TodayProducts {
  private price: HTMLParagraphElement;
  private quantity: HTMLParagraphElement;
  constructor() {
    this.price = document.querySelector("#today-total-price")!;
    this.quantity = document.querySelector("#today-quantity")!;
  }

  display(overview: overview) {
    animateValue(this.price, +this.price.innerHTML, overview.totalPrice, 1000);
    animateValue(this.quantity, +this.quantity.innerHTML, overview.items, 1000);
  }
}
