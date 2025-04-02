import express from "express";
import "dotenv/config";
import "types.d.ts";
import appRouter from "./routes/userRoute";
import portfolioRouter from "./routes/portfolioRoutes";
import { errorHandler } from "./middlewares/ErrorHandler";
import { PORT } from "./constants/env";
import { connectDB } from "./config/connectDb";

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
