import express from "express";
// import * as dotenv from "dotenv";
import "dotenv/config";
import appRouter from "./routes/userRoute.js";
import portfolioRouter from "./routes/portfolioRoutes.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import { PORT } from "./constants/env.js";
import { connectDB } from "./config/connectDb.js";

// dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", appRouter);
app.use("/api", portfolioRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Running on http://localhost:${PORT}`);
});
