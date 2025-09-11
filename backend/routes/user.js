import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/myProfile", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logout);

export default router;