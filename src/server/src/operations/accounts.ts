import AccountService from "../services/accountService";

export class Account {
  private account: Promise<any>;

  constructor(private accountNumber: string, private totalPrice: number) {
    this.account = AccountService.getAccountByNumber(this.accountNumber);
  }

  private async save() {
    await AccountService.saveAccount(this.accountNumber, this.totalPrice);
  }

  private async update() {
    await AccountService.updateAccount(await this.account, this.totalPrice);
  }

  async processing() {
    if (await this.account) return this.update();
    this.save();
  }
}
