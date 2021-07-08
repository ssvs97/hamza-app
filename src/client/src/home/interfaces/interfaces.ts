export type overview = { items: number; totalPrice: number };

export type converter = { [key: string]: object[] };

export type accounts = Array<{
  _id: string;
  price: number;
  accountNumber: number;
  date: string;
}>;

export type productDetails = Array<{
  _id: string;
  items: number;
  totalPrice: number;
}>;

export type displayObject = { display(products: any): void };
