process.env.TEST = "DONE";
process.env.JWT_SECRET = "DONE";
process.env.PORT = "5000";
process.env.MONGO_URI = "mongodb://localhost:27017/test"; // Mock the database URI
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { connectDB } from "../config/connectDb.js";

let mongoserver: MongoMemoryServer;
beforeAll(async () => {
  mongoserver = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoserver.getUri(); // Mock the database URI
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoserver.stop();
});

describe("MongoDB Connection", () => {
  it("should connect to the in-memory MongoDB", async () => {
    const connection = await connectDB();
    expect(connection.connection.readyState).toBe(1); // 1 = connected
  });

  // it("should fail if an invalid URI is provided", async () => {
  //   await expect(connectDB()).rejects.toThrow("Database connection failed");
  // });

  it("should fial if an invalid URI is provided", () => {
    delete process.env.MONGO_URI; // Mock the database URI
    process.env.MONGO_URI = "invalid_uri"; // Mock an incorrect URI
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });
    const mockConsoleLog = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockConsoleLog).toHaveBeenCalled();
    mockExit.mockRestore();
    mockConsoleLog.mockRestore();
  });
});
