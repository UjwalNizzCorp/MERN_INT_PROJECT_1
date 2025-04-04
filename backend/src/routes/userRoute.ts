import express from "express";
import {
  getSingleUser,
  loginController,
  registerController,
} from "../controller/authControl.js";
import {
  loginVlaidateMiddleware,
  registserValidateMiddleware,
} from "../middlewares/ValidationMeddleware.js";
const appRouter = express.Router();

appRouter.post("/register", registserValidateMiddleware, registerController);
appRouter.post("/login", loginVlaidateMiddleware, loginController);
appRouter.get("/:id", getSingleUser);

export default appRouter;
