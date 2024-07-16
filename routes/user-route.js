import express from "express";
import { getAllProfile, getAllUser, login, profile, register, updateUserProfile } from "../controllers/user-controller.js";

const router = express.Router();


router.get("/", getAllUser );
router.post("/auth/register", register );
router.post("/auth/login", login);
router.post("/profile",  profile);
router.put("/update/profile/:id", updateUserProfile);
router.get("/user/profile", getAllProfile);

export default router;