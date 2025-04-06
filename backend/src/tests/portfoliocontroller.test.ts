import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { getPortfolioController } from "../controller/portfolioControl.js";
import PortfolioServices from "../service/portfolioService.js";

// Mock PortfolioServices
jest.mock("../service/portfolioService.js");

const app = express();
app.use(express.json());
app.get("/portfolio/:id", getPortfolioController);

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Something went wrong" });
});

describe("getPortfolioController", () => {
  beforeEach(() => {
    jest.spyOn(PortfolioServices.prototype, "getPortfolioById");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return portfolio data successfully", async () => {
    const mockPortfolio = { id: "123", name: "My Portfolio" };
    (
      PortfolioServices.prototype.getPortfolioById as jest.Mock
    ).mockResolvedValue(mockPortfolio);

    const res = await request(app).get("/portfolio/123");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPortfolio);
    expect(PortfolioServices.prototype.getPortfolioById).toHaveBeenCalledWith(
      "123"
    );
  });

  it("should return 500 if an error occurs", async () => {
    (
      PortfolioServices.prototype.getPortfolioById as jest.Mock
    ).mockRejectedValue(new Error("DB error"));

    const res = await request(app).get("/portfolio/123");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Something went wrong" });
    expect(PortfolioServices.prototype.getPortfolioById).toHaveBeenCalledWith(
      "123"
    );
  });
});
