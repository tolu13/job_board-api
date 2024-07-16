import User from "../model/User.js";
import bcrypt from "bcryptjs";
import UserProfile from "../model/Profile.js";
import Company from "../model/Company.js";
import Job from "../model/Job.js";
import mongoose from "mongoose";

 export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({message: "No Users Found"});
    }
    return res.status(200).json({ users});
};