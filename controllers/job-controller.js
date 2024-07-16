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
