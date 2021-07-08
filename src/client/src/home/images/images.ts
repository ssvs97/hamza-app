import FavIcon from "../../../images/chart.png";
import Cart from "../../../images/cart.png";
import Download from "../../../images/downloading.png";
import Info from "../../../images/info.png";
import Price from "../../../images/price.png";
import Search from "../../../images/search.png";
import Time from "../../../images/time.png";
import Today from "../../../images/today.png";

export class Images {
  private search: HTMLImageElement;
  private today: HTMLImageElement;
  private time: HTMLImageElement;
  private download: HTMLImageElement;
  private info: HTMLImageElement;
  private price: NodeListOf<HTMLImageElement>;
  private cart: NodeListOf<HTMLImageElement>;
  private link: HTMLLinkElement;

  constructor() {
    this.search = document.querySelector("#search-icon")!;
    this.today = document.querySelector("#today-icon")!;
    this.time = document.querySelector("#time-icon")!;
    this.download = document.querySelector(".download-image")!;
    this.info = document.querySelector(".more-info-image")!;
    this.price = document.querySelectorAll("#price-icon")!;
    this.cart = document.querySelectorAll("#cart-icon")!;
    this.link = document.querySelector("link[rel~='icon']")!;
  }

  render() {
    this.addsearchIcon();
    this.addTodayIcon();
    this.addTimeIcon();
    this.addDownloadIcon();
    this.addInfoIcon();
    this.addCartIcon();
    this.addPriceIcon();
    this.addFavIcon();
  }

  private addFavIcon() {
    this.link = document.createElement("link");
    this.link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(this.link);

    this.link.href = FavIcon;
  }

  private addsearchIcon() {
    this.search.src = Search;
  }

  private addTodayIcon() {
    this.today.src = Today;
  }

  private addTimeIcon() {
    this.time.src = Time;
  }

  private addDownloadIcon() {
    this.download.src = Download;
  }

  private addInfoIcon() {
    this.info.src = Info;
  }

  private addCartIcon() {
    for (let i = 0; i < this.cart.length; i++) this.cart[i].src = Cart;
  }

  private addPriceIcon() {
    for (let i = 0; i < this.price.length; i++) this.price[i].src = Price;
  }
}
