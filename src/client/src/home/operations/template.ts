import { validateRespone } from "../../utils/validator";
import { converter } from "../interfaces/interfaces";
import { Notifications } from "../notifications/notifications";

export abstract class Template extends Notifications {
  constructor(private button: HTMLButtonElement) {
    super();
    this.configure();
  }

  abstract preRequest(): converter | string | void;
  abstract request(data?: converter | string | void): Promise<Response>;
  abstract operation(response: Response | void): void;
  abstract display(response: Response | void): void;

  private configure() {
    this.button.addEventListener("click", async () => this.handler());
  }

  private handler() {
    this.run();
  }

  protected async run() {
    try {
      const data = this.preRequest();
      const response = await this.request(data);
      await validateRespone(response);
      await this.operation(response);
      this.display(response);
    } catch (error) {
      this.errorNotification(error.message);
    }
  }
}
