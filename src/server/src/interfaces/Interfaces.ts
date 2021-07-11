import AppError from "../utils/appError";

export type counter = {
  items: number;
  totalPrice: number;
  [productName: string]: number;
};
export type products = Array<{
  productName: string;
  productPrice: string;
  voucherCode: string;
  length: number;
  date: string;
  accountNumber: string;
}>;
export type product = {
  productName: string;
  productPrice: string;
  voucherCode: string;
  length: number;
  date: string;
  accountNumber: string;
};
export type account = { date: string; price: number; save: Function };
export type error = AppError & {
  code: number;
  errmsg: string;
  path: string;
  value: string;
  errors: object;
  statusCode: number;
};
