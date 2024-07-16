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

export const register = async (req, res, next) => {
    const { name, email, password, user_type, companyName, industry, description } = req.body;
  
      let exisitingUser;
      try {
          exisitingUser = await User.findOne({ email });
      } catch (err) {
         return res.status(500).json({message: "database couldnt be accessed"});
      }
      if (exisitingUser) {
          return res.status(400).json({message: "User Already Exists! Login Instead"});
      }
  
      const hashedPassword = bcrypt.hashSync(password)
  
      const user = new User({
          name,
          email,
          password: hashedPassword,
          user_type
      });
          
      try {
          await user.save();
      } catch (error) {
          return res.status(400).json({message: "Check that your inputs are valid"});
      }
      
      if (user_type === 'company') {
  
         const newCompany = new Company({
              user_id: mongoose.user.id,
              name: companyName,
              industry,
              description
          }); 
      try {
          await newCompany.save();
      }catch (err) {
         return console.log(err);
      }
      return res.status(201).json({user})
  }  
  return res.status(201).json({message: "User created succesfully"});
   
  };