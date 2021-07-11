import { Template } from "./template";

export class Accounts extends Template {
  constructor() {
    super(document.querySelector(".accounts-label")! as HTMLButtonElement);
  }

  async request() {
    const url = "/accounts";
    const response = await fetch(url);
    return response;
  }

  displayMethod() {
    return this.displayFactory.accountsId();
  }

  keyboardListener() {
    document.addEventListener("keydown", (event) => {
      if (event.altKey) this.run();
    });
  }
}
