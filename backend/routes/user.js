import express from "express";
import { changePassword, getMyProfile, login, logout, register, updateProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/myProfile", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logout);
router.put("/updateProfile", isAuthenticated, updateProfile);
router.put("/changePassword", isAuthenticated, changePassword);

export default router;