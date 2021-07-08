import { formatAMPM } from "../../utils/date";
import { accounts } from "../interfaces/interfaces";
import { Tables } from "./tables";

export class AccountsId extends Tables {
  constructor() {
    super(document.querySelector(".accounts-id-nav")!);
  }

  display(products: accounts): void {
    const accountsTable = document.querySelector("#accounts-id-table")!;
    const tableBody = document.querySelector("#accounts-id-table tbody")!;
    const tb = document.createElement("tbody")!;

    tableBody.remove();
    accountsTable.appendChild(tb);

    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      const [date, time] = formatAMPM(element.date);

      const tr = document.createElement("tr");
      const tdDate = document.createElement("td");
      const tdTime = document.createElement("td");
      const price = document.createElement("td");
      const tdAccountID = document.createElement("td");
      const tdDelete = document.createElement("td");
      const deleteBtn = document.createElement("button");

      tdDate.classList.add("column3");
      tdDate.innerHTML = date;

      tdTime.classList.add("column3");
      tdTime.innerHTML = time;

      price.classList.add("column3");
      price.innerHTML = `${element.price}$`;

      tdAccountID.classList.add("column3");
      tdAccountID.innerHTML = element.accountNumber.toString();

      tdDelete.classList.add("column3");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = "remove";
      deleteBtn.setAttribute("id", element._id);

      tb.appendChild(tr);
      tr.appendChild(tdDate);
      tr.appendChild(tdTime);
      tr.appendChild(price);
      tr.appendChild(tdAccountID);
      tr.appendChild(tdDelete);
      tdDelete.appendChild(deleteBtn);

      tdDelete.addEventListener("click", () => {
        this.deleteRequest(deleteBtn.getAttribute("id")!);
        tr.remove();
      });
    }
  }

  private async deleteRequest(account_id: string) {
    try {
      const url = "/accounts";
      await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ account_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
