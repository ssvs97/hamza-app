import {
  array,
  object,
  string,
  number,
  ArraySchema,
  ObjectSchema,
  date,
} from "joi";

export class Joi {
  private static instance: Joi;
  saveProductsSchema: ArraySchema;
  accountsQuerySchema: ObjectSchema;

  private constructor() {
    this.saveProductsSchema = this.saveProducts();
    this.accountsQuerySchema = this.accountsQuery();
  }

  public static getInstance(): Joi {
    if (!Joi.instance) {
      Joi.instance = new Joi();
    }
    return Joi.instance;
  }

  private saveProducts() {
    return array().items(
      object({
        productName: string().required(),
        voucherCode: string().required(),
        productPrice: number().required(),
      })
    );
  }

  private accountsQuery() {
    return object({
      date: date(),
      accountNumber: number(),
    }).without("date", "accountNumber");
  }
}
