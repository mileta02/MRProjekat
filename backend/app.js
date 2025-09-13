import express from "express";
import { config } from "dotenv";
import user from "./routes/user.js";
import product from "./routes/product.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

config({
  path: "./data/config.env",
})
export const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/user", user);
app.use("/api/product", product);

//Error Middleware
app.use(errorMiddleware);