import express, { Request, NextFunction } from "express";
import morgan from "morgan";
import { join } from "path";
import AppError from "./utils/appError";
import routerProducts from "./routers/products";
import routerAccounts from "./routers/accounts";
import routerViews from "./routers/views";
import globalErrorHandler from "./controllers/error.controller";
import compression from "compression";
export const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const clientPath = join(__dirname, "../../client");
app.set("view engine", "hbs");
app.set("views", join(clientPath, "views"));

app.use(compression());
app.use(express.static(clientPath));
app.use(express.json({ limit: "10kb" }));
app.use(routerViews);
app.use(routerProducts);
app.use(routerAccounts);

app.all("*", (req: Request, _, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
