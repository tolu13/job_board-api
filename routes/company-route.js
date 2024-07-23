import express from 'express';
import { createCompany, getAllCompanies, getCompanyJobs } from '../controllers/company-controller.js';
import { authenticateUser, restrictToCompany } from '../middlewares/auths.js';

const compRouter = express.Router();

compRouter.get("/company", getAllCompanies);
compRouter.post("/company", authenticateUser, restrictToCompany, createCompany);
compRouter.get("/company/:id/jobs", getCompanyJobs);

export default compRouter;