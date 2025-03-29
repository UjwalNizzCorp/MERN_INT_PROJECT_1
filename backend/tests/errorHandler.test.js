import ErrorMessage from "../util/errorMessage.js";
import request from "supertest";
import express from "express";
import { errorHandler } from "../Middleware/errorHandler.js";

const app = express();
app.use(express.json());

// Dummy route to trigger errors
app.get("/error", (req, res, next) => {
  const error = new ErrorMessage(400, "Test error");
  next(error);
});

app.get("/server-error", (req, res, next) => {
  next(new Error());
});

// Apply error handler
app.use(errorHandler);

describe("errorHandler Middleware", () => {
  it("should return the correct status and message for a custom error", async () => {
    const res = await request(app).get("/error");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Test error" });
  });

  it("should return 500 and default message for unhandled errors", async () => {
    const res = await request(app).get("/server-error");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Internal Server Error" });
  });
});
