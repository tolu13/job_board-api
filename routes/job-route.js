import express from "express";
import { applyJob, createJob, getAllJob, getJobApplications, getJobId } from "../controllers/job-controller.js";



const jobRouter = express.Router();

jobRouter.get("/jobs", getAllJob);
jobRouter.post("/jobs", createJob);
jobRouter.get("/jobs/:job_id", getJobId);
jobRouter.post("/jobs/:job_id/apply", applyJob);
jobRouter.get("/jobs/:job_id/applications", getJobApplications);

export default jobRouter;