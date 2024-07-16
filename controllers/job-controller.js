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
