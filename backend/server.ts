import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

// Routes
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import orderRoutes from "./routes/order";
import uploadRoutes from "./routes/upload";
import morgan from "morgan";
import { nodeEnv } from "./config";

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware to accept JSON in body
app.use(express.json());

// Morgan logging
app.use(morgan("dev"));

dotenv.config();

connectDB();

app.get("/", (_req: Request, res: Response) => {
  res.send("API IS RUNNING...");
});

app.use("/api/v1/products/", productRoutes);
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/orders/", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);

// Make uploads folder static
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Use Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${nodeEnv} mode on port ${PORT}`);
});
