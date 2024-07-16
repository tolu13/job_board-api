import express from "express";
import Company from "./model/Company.js";

async function findCompanyWithJobs(companyId) {
    try {
        const company = await Company.findById(companyId).populate('jobsPosted');

        if (!company) {
            console.log('Company not found');
            return null;
        }

        return company;
    } catch (error) {
        console.error('Error finding company:', error);
        return null;
    }
};
export default findCompanyWithJobs;