import express from "express";
import { applyJob, createJob, deleteJob, getAllJob, getJobApplications, getJobId } from "../controllers/job-controller.js";
import { authenticateUser, restrictToCompany, restrictToJobSeeker } from "../middlewares/auths.js"; // Corrected path

const jobRouter = express.Router();

jobRouter.get("/jobs", getAllJob);
jobRouter.post("/jobs", authenticateUser, restrictToCompany, createJob);
jobRouter.get("/jobs/:job_id", getJobId);
jobRouter.post("/jobs/:job_id/apply", authenticateUser, restrictToJobSeeker, applyJob);
jobRouter.get("/jobs/:job_id/applications", authenticateUser, restrictToCompany, getJobApplications);
jobRouter.delete("/jobs/:job_id", authenticateUser, restrictToCompany, deleteJob);

export default jobRouter;
