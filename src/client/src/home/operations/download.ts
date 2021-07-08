import { PendingProducts } from "../products/pending";
import { Template } from "./template";

export class Download extends Template {
  constructor() {
    super(document.querySelector(".download-image")!);
  }

  preRequest() {}

  async request() {
    const url = "/download-pending-products";
    const response = await fetch(url);
    return response;
  }

  async operation(response: Response) {
    if (!response.body) throw new Error("Download Error.");

    const reader = response.body.getReader();

    // Step 3: read the data
    let chunks = []; // array of received binary chunks (comprises the body)
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;
      if (!value) continue;

      chunks.push(value);
    }

    const newBlob = new Blob(chunks, {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    var blobUrl = URL.createObjectURL(newBlob);

    window.open(blobUrl, "_blank");

    this.notification(`<span class="green">Successful Download!</span>`);
  }

  display() {
    new PendingProducts().run();
  }
}
