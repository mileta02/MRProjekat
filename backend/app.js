import express from "express";
import { config } from "dotenv";
import user from "./routes/user.js";
import product from "./routes/product.js";
import order from "./routes/order.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
  path: "./data/config.env",
})
export const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET","POST","PUT","DELETE"],
    //origin: [process.env.FRONTEND_URI_1, process.env.FRONTEND_URI_2m, "http://192.168.1.12:8081",]
    //   "exp://192.168.1.12:8081" ]
  })
)
// Routes
app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/order", order);

//Error Middleware
app.use(errorMiddleware);