import mongoose from "mongoose";
import { connectDB } from "../config/connectDb.js";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

beforeAll(async () => {
  // Start an in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri(); // Mock the database URI
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Database Connection", () => {
  it("should connect to MongoDB successfully", async () => {
    const connection = await connectDB();
    expect(connection.connection.readyState).toBe(1); // 1 = connected
  });

  it("should fail if an invalid URI is provided", async () => {
    process.env.MONGO_URI = "invalid_uri"; // Mock an incorrect URI

    await expect(connectDB()).rejects.toThrow("Database connection failed");
  });
});
