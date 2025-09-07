import express from "express";
import {config} from "dotenv"; 

config({
  path:"./data/config.env",
})
export const app = express();

//Middlewares
app.use(express.json());

// Routes
import user from "./routes/user.js";
app.use("/api/user", user);