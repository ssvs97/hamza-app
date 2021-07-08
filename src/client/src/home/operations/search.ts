import { isDate, validateInput } from "../../utils/validator";
import { Display } from "../display/factory";
import { Template } from "./template";

export class Search extends Template {
  input: HTMLInputElement;

  constructor() {
    super(document.querySelector(".account-id img")! as HTMLButtonElement);
    this.input = document.querySelector("#account-id")!;
    this.keyboardListener();
  }

  preRequest() {
    const input = this.input.value.trim();
    if (isDate(input)) {
      return `date=${input}`;
    }
    validateInput(input);
    return `accountNumber=${input}`;
  }

  async request(query: string) {
    const url = `/accounts?${query}`;
    const response = await fetch(url);
    return response;
  }

  operation() {}

  async display(response: Response) {
    const products = await response.json();
    new Display().accountsId().display(products);
  }

  keyboardListener() {
    this.input.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.run();
      }
    });
  }
}
