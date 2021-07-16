import { Router } from "express";
import AccountController from "../controllers/accounts.controller";
// import cleanCache from "../middlewares/cleanCache";
import catchAsync from "../utils/catchAsync";

const accounts = Router();

accounts
  .route("/accounts")
  .get(catchAsync(AccountController.getAccounts))
  .delete(catchAsync(AccountController.deleteAccount));

export default accounts;
