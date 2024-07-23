import express from "express";
import { getAllProfile, getAllUser, login, profile, register, updateUserProfile, userProfileId } from "../controllers/user-controller.js";
import authMiddleware, {authenticateUser, restrictToJobSeeker} from "../middlewares/auths.js";


const router = express.Router();

router.get("/", getAllUser );
router.post("/auth/register", register );
router.post("/auth/login", login);
router.post("/profile", authenticateUser, restrictToJobSeeker, profile);
router.put("/update/profile/:id", authenticateUser, restrictToJobSeeker, updateUserProfile);
router.get("/user/profile", authenticateUser, getAllProfile);
router.get("/user/profile/:id", authenticateUser, restrictToJobSeeker, userProfileId);
export default router;