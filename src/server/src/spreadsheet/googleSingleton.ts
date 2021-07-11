import { GoogleSpreadsheet } from "google-spreadsheet";

export class Google {
  private static instance: Google;
  private doc: GoogleSpreadsheet;

  private constructor() {
    this.doc = new GoogleSpreadsheet(process.env.GOOGLE_ID);
    this.connect();
  }

  private async connect() {
    await this.doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ) as string,
    });
    await this.doc.loadInfo();
  }

  public static getInstance(): Google {
    if (!Google.instance) {
      Google.instance = new Google();
    }

    return Google.instance;
  }

  get spreadsheet() {
    return this.doc;
  }
}
