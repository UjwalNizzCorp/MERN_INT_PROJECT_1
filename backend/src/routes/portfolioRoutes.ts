import { Router } from "express";
import { getPortfolioController } from "../controller/portfolioControl";

const portfolioRouter = Router();

portfolioRouter.get("/portfolio/:id", getPortfolioController);

export default portfolioRouter;
