import express from "express";
import { applyJob, createJob, deleteJob, getAllJob, getJobApplications, getJobId } from "../controllers/job-controller.js";



const jobRouter = express.Router();

jobRouter.get("/jobs", getAllJob);
jobRouter.post("/jobs", createJob);
jobRouter.get("/jobs/:job_id", getJobId);
jobRouter.post("/jobs/:job_id/apply", applyJob);
jobRouter.get("/jobs/:job_id/applications", getJobApplications);
jobRouter.delete("/jobs/:job_id", deleteJob);

export default jobRouter;