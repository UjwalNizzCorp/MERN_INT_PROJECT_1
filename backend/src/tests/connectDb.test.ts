process.env.PORT = "5000";
process.env.MONGO_URI = "mongodb://localhost:27017/porfoliodb";
process.env.JWT_SECRET = "5000";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { connectDB } from "../config/connectDb.js";
import { log } from "console";

delete process.env.MONGO_URI;
delete process.env.PORT;
delete process.env.JWT_SECRET;

describe("MongoDB Connection", () => {
  let mongoServer: MongoMemoryServer;
  const originalEnv = { ...process.env };
  const originalExit = process.exit;
  const originalConsoleLog = console.log;

  beforeAll(async () => {
    // Setup in-memory MongoDB and required environment variables
    mongoServer = await MongoMemoryServer.create();
    process.env = {
      ...originalEnv,
      MONGO_URI: mongoServer.getUri(),
      PORT: "5000", // Add required env variables
      JWT_SECRET: "test_secret",
    };
  });
  beforeEach(() => {
    // Reset process.env and mocks before each test
    console.log = jest.fn();
    process.exit = jest.fn() as never;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterEach(async () => {
    // Restore original functions after each test
    process.env = originalEnv;
    console.log = originalConsoleLog;
    process.exit = originalExit;
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("should successfully connect to MongoDB", async () => {
    await connectDB(process.env.MONGO_URI as string);
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("DB Connected")
    );
  });

  it("should handle missing MONGO_URI", async () => {
    // Remove MONGO_URI from environment
    await mongoose.disconnect();
    delete process.env.MONGO_URI;

    await connectDB("");

    // Verify error handling
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Error When connecting to DB")
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
