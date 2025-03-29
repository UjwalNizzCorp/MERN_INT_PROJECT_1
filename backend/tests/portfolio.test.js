import { MongoMemoryServer } from "mongodb-memory-server";
import PortfolioServices from "../service/portfolioServices";
import PortfolioModel from "../Models/PortfolioModle";
import mongoose from "mongoose";

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Portfolio Service", () => {
  let portfolioService;

  beforeEach(() => {
    portfolioService = new PortfolioServices();
  });

  test("Should return Error not non-valid ObjectId", () => {
    expect(() => portfolioService.isValidObjectId("invalidObjecId")).toThrow(
      "Not a valid ObjectId"
    );
  });

  test("Should return a portfolio", async () => {
    const newPortfolio = await PortfolioModel.create({
      skills: ["js", "node"],
      about: "dev",
      contact: "12301293",
      experience: "5y",
      fullName: "John Done",
      websiteUrl: "www.google.com",
    });
    const fetchPortfolio = await portfolioService.getPortfolioById(
      newPortfolio._id
    );
    await expect(fetchPortfolio.about).toBe("dev");
  });
});
