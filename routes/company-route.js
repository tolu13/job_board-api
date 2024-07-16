import express from 'express';
import { createCompany, getAllCompanies, getCompanyJobs } from '../controllers/company-controller.js';

const compRouter = express.Router();

compRouter.get("/company", getAllCompanies);
compRouter.post("/company", createCompany);
compRouter.get("/company/:id/jobs", getCompanyJobs);

export default compRouter;