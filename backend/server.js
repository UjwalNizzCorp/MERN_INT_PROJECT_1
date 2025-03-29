import express from "express";
import "dotenv/config";
import appRouter from "./routes/route.js";
import { errorHandler } from "./Middleware/errorHandler.js";
import portfolioRouter from "./routes/portfolioRoutes.js";
import { connectDB } from "./config/connectDb.js";
import { PORT } from "./constance/env.js";

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
