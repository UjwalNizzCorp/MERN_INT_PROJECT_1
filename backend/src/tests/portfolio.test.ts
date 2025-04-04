import { MongoMemoryServer } from "mongodb-memory-server";
import PortfolioServices from "../service/portfolioService.js";
import PortfolioModel from "../model/PortfolioModle.js";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Portfolio Service", () => {
  let portfolioService: PortfolioServices;

  beforeEach(() => {
    portfolioService = new PortfolioServices();
  });

  test("Should return Error not non-valid ObjectId", () => {
    expect(() => portfolioService.isValidObjectId("invalidObjecId")).toThrow(
      "Not a valid ObjectId"
    );
  });

  test("Should return a portfolio", async () => {
    const userId = new mongoose.Types.ObjectId();
    const newPortfolio = await PortfolioModel.create({
      skills: ["js", "node"],
      experience: "5y",
      userId,
    });
    const fetchPortfolio = await portfolioService.getPortfolioById(
      newPortfolio._id.toString()
    );

    await expect(fetchPortfolio.userId.toString()).toBe(userId.toString());
  });
});
