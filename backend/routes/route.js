import express from "express";
import {
  getSingleUser,
  loginController,
  registerController,
} from "../Controllers/authController.js";
import {
  loginVlaidateMiddleware,
  registserValidateMiddleware,
} from "../Middleware/validateMiddleware.js";
const appRouter = express.Router();

appRouter.post("/register", registserValidateMiddleware, registerController);
appRouter.post("/login", loginVlaidateMiddleware, loginController);
appRouter.get("/:id", getSingleUser);

export default appRouter;
