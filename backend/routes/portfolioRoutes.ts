import { Router } from "express";
import { getPortfolioController } from "../Controllers/portfolioControl";

const portfolioRouter = Router();

portfolioRouter.get("/portfolio/:id", getPortfolioController);

export default portfolioRouter;
