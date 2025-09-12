import express from "express";
import { changePassword, forgetPassword, getMyProfile, login, logout, register, resetPassword, updateProfile, updateProfilePicture } from "../controllers/userController.js";
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
router.route("/forgetPassword").post(forgetPassword).put(resetPassword);

export default router;