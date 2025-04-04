import { Router } from "express";
import { getPortfolioController } from "../controller/portfolioControl.js";

const portfolioRouter = Router();

portfolioRouter.get("/portfolio/:id", getPortfolioController);

export default portfolioRouter;
