import express from "express";
import { getMyProfile, login, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/myProfile", isAuthenticated, getMyProfile);

export default router;