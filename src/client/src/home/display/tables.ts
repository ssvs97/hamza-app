export class Tables {
  dropbox: HTMLStyleElement;
  constructor(private navigation: HTMLStyleElement) {
    this.dropbox = document.querySelector(".dropbox")!;
    this.configure();
    this.showTable();
  }

  protected configure() {
    this.dropbox.addEventListener("click", () => this.hideTable());
  }

  protected async showTable() {
    this.dropbox.style.display = "block";
    this.navigation.style.display = "block";

    setTimeout(() => {
      this.dropbox.style.opacity = "1";
      this.navigation.style.opacity = "1";
    }, 10);
  }

  protected hideTable() {
    this.dropbox.style.opacity = "0";
    this.navigation.style.opacity = "0";

    setTimeout(() => {
      this.dropbox.style.display = "none";
      this.navigation.style.display = "none";
    }, 1000);
  }
}
