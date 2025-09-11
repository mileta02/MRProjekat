import express from "express";
import { config } from "dotenv";
import user from "./routes/user.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

config({
  path: "./data/config.env",
})
export const app = express();

//Middlewares
app.use(express.json());

// Routes
app.use("/api/user", user);

//Error Middleware
app.use(errorMiddleware);