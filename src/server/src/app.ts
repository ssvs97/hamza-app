import "./db/mongoose";
import express, { Request, NextFunction } from "express";
import { join } from "path";
import AppError from "./utils/appError";
import routerProducts from "./routers/products";
import routerAccounts from "./routers/accounts";
import routerViews from "./routers/views";
import globalErrorHandler from "./controllers/error.controller";

console.log(process.env.GOOGLE_PRIVATE_KEY);
console.log(process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"));

const app = express();

if (process.env.NODE_ENV === "development") {
  const debug = require("debug")("http");

  app.use((req: Request, _, next: NextFunction) => {
    debug(req.method + " " + req.url);
    next();
  });
}

const clientPath = join(__dirname, "../../client");
app.set("view engine", "hbs");
app.set("views", join(clientPath, "views"));

app.use(express.static(clientPath));
app.use(express.json());
app.use(routerViews);
app.use(routerProducts);
app.use(routerAccounts);
app.all("*", (req: Request, _, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => console.log("Server Running..."));
