import { AccountsId } from "./accountsId";
import { MoreInformation } from "./moreInformation";
import { PendingProducts } from "./pendingProducts";
import { TodayProducts } from "./todayProducts";

export class Display {
  todayProducts() {
    return new TodayProducts();
  }

  pendingProducts() {
    return new PendingProducts();
  }

  moreInformation() {
    return new MoreInformation();
  }

  accountsId() {
    return new AccountsId();
  }
}
