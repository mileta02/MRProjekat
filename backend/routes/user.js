import express from "express";
import { getMyProfile } from "../controllers/userController.js";

const router = express.Router();

router.route("/user").get(getMyProfile);

export default router;