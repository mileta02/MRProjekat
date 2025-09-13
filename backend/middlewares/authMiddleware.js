import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import { asyncErrorCatcher } from "./errorMiddleware.js";

export const isAuthenticated = asyncErrorCatcher(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new ErrorHandler("Please log in.", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT);
    req.user = await User.findById(decodedData._id);

    next();
});

export const isAdmin = asyncErrorCatcher(async (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new ErrorHandler("Only admin allowed command.", 401));
    }

    next();
});