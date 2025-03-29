import { Router } from "express";
import { getPortfolioController } from "../Controllers/portfolioController.js";

const portfolioRouter = Router();

portfolioRouter.get("/portfolio/:id", getPortfolioController);

export default portfolioRouter;
