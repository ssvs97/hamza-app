import { NextFunction, Request, Response } from "express";
import AccountService from "../services/accountService";
import AppError from "../utils/appError";
import { Joi } from "../utils/joi";
import { getDate } from "../utils/date";

export default class Account {
  static async getAccounts(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const query = request.query;

    const joi = Joi.getInstance();
    await joi.accountsQuerySchema.validateAsync(query);

    if (query.date) {
      const [start, end] = getDate(query.date as string);
      const data = await AccountService.getAccountByDate(start, end);
      if (data.length == 0) return next(new AppError("No data found.", 404));
      return response.send(data);
    }
    const data = await AccountService.getAccountByQuery(query);

    if (data.length == 0) return next(new AppError("No data found.", 404));
    return response.send(data);
  }

  static async deleteAccount(
    request: Request,
    response: Response,
    _: NextFunction
  ) {
    await AccountService.deleteAccount(request.body.account_id);
    response.send();
  }
}
