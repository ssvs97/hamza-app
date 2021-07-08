import { Display } from "../display/factory";
import { validateRespone } from "../../utils/validator";
import { displayObject } from "../interfaces/interfaces";
import { Notifications } from "../notifications/notifications";

export abstract class Template {
  displayFactory: Display;
  constructor(private button?: HTMLButtonElement) {
    this.displayFactory = new Display();
    this.configure();
  }

  abstract request(): Promise<Response>;
  abstract displayMethod(): displayObject;
  abstract keyboardListener(): void;

  protected configure() {
    if (this.button)
      this.button.addEventListener("click", async () => this.run());
    this.keyboardListener();
  }

  async run() {
    try {
      const response = await this.request();
      await validateRespone(response);
      const displayMethod = this.displayMethod();
      this.display(displayMethod, response);
    } catch (error) {
      new Notifications().errorNotification(error.message);
    }
  }

  async display(displayMethod: displayObject, response: Response) {
    const products = await response.json();
    displayMethod.display(products);
  }
}
