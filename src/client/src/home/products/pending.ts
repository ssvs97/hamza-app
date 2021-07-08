import { Template } from "./template";

export class PendingProducts extends Template {
  async request() {
    const url = "pending-products";
    const response = await fetch(url);
    return response;
  }

  displayMethod() {
    return this.displayFactory.pendingProducts();
  }
  keyboardListener() {}
}
