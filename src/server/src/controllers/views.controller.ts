import { Request, Response } from "express";

export default class Product {
  static async renderHome(_: Request, response: Response) {
    response.render("home.hbs");
  }
}
