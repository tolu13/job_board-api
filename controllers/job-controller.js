import Company from "../model/Company.js";
import Job from "../model/Job.js";
import User from "../model/User.js";

export const getAllJob = async (req, res, next) => {
    let jobs;
    try {
        jobs = await Job.find();
    } catch (err) {
        console.log(err);
    }
    if (!jobs) {
       return res.status(404).json({message: "No Jobs Found"});
    }
    return res.status(200).json({jobs});
};

export const createJob = async (req, res, next) => {
    const {title, description, company, location, salary, requirements, responsibilities, datePosted} = req.body;
    
    const job = new Job({
        title,
        description,
        company,
        location,
        salary,
        requirements,
        responsibilities,
        datePosted
    });
    try {
        await job.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err})
    }
    return res.status(201).json({job})

};

export const getJobId = async (req, res, next) => {
    const jobId = req.params.job_id;

    let job;
    try {
        job = await Job.findById(jobId);
    } catch (err) {
        return console.log(err);
    }
    if (!job) {
        return res.status(404).json({message: "No Job found"});
    }
    return res.status(200).json({job})
};

export const applyJob = async (req, res, next) => {
    const jobId = req.params.job_id;
    const { candidateName, email, resume, coverLetter} = req.body;

    let job;
    try {
        job = await Job.findById(jobId);
    } catch (err) {
        return console.log(err);
    }
    if (!job) {
        return res.status(404).json({message: "Job not found"});
    }

    job.applications.push({
        candidateName,
        email,
        resume,
        coverLetter
    });

    try {
        await job.save();
    } catch (err) {
        res.status(500).json({message: "Unable to submit application"});
    }
    res.status(201).json({message: "Application submitted succesfully"});
};

export const getJobApplications = async (req, res, next) => {
    const jobId = req.params.job_id;
    let job;
    try {
        job = await Job.findById(jobId).populate('applications').exec();
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
    if (!job) {
        return res.status(404).json({message: "Job not found"});
    }
    const applications = job.applications;
    return res.status(200).json({applications});
};