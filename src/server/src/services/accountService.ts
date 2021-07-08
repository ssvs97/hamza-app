import { account } from "../interfaces/Interfaces";
import { Account } from "../models/accounts";
import { getNow } from "../utils/validator";

export default class ProductService {
  static async getAccountByNumber(accountNumber: string) {
    return await Account.findOne({
      accountNumber,
    });
  }

  static async getAccountByQuery(query: object) {
    return await Account.find(query).sort({ date: -1 });
  }

  static async getAccountByDate(start: Date, end: Date) {
    return await Account.find({
      date: {
        $gte: start,
        $lt: end,
      },
    });
  }

  static async saveAccount(accountNumber: string, price: number) {
    return await new Account({
      accountNumber,
      price,
      date: getNow(),
    }).save();
  }

  static async updateAccount(Account: account, price: number) {
    Account.date = getNow();
    Account.price = price;

    await Account.save();
  }

  static async deleteAccount(_id: string) {
    await Account.findByIdAndDelete(_id);
  }
}
