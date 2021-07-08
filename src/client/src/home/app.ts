import { Images } from "./images/images";
import { TodayProducts } from "./products/today";
import { PendingProducts } from "./products/pending";
import { MoreInformation } from "./products/moreInformation";
import { AccountsId } from "./products/accountsId";
import { Search } from "./operations/search";
import { Download } from "./operations/download";
import { Converter } from "./operations/converter";

new Images().render();

Promise.all([new TodayProducts().run(), new PendingProducts().run()]);

new MoreInformation();
new AccountsId();
new Search();
new Download();
new Converter();
