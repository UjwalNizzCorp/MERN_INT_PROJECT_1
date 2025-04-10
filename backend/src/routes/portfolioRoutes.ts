import { Router } from "express";
import {
  createPortfolioController,
  getPortfolioController,
} from "../controller/portfolioControl.js";

const portfolioRouter = Router();

portfolioRouter.get("/portfolio/:id", getPortfolioController);
portfolioRouter.post("/portfolio/create", createPortfolioController);

export default portfolioRouter;
