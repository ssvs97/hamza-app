import { Template } from "./template";

export class MoreInformation extends Template {
  constructor() {
    super(document.querySelector(".more-info")! as HTMLButtonElement);
  }

  async request() {
    const url = "/pending-more-info";
    const response = await fetch(url);
    return response;
  }

  displayMethod() {
    return this.displayFactory.moreInformation();
  }

  keyboardListener() {
    document.addEventListener("keydown", (event) => {
      if (event.key == "i") this.run();
    });
  }
}
