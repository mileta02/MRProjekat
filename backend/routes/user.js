import express from "express";
import { changePassword, getMyProfile, login, logout, register, updateProfile, updateProfilePicture } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { uploadSingle } from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", uploadSingle, register);
router.get("/logout", isAuthenticated, logout);

router.get("/myProfile", isAuthenticated, getMyProfile);

router.put("/updateProfile", isAuthenticated, updateProfile);
router.put("/updateProfilePicture", isAuthenticated, uploadSingle, updateProfilePicture);
router.put("/changePassword", isAuthenticated, changePassword);

export default router;