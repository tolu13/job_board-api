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

  export const login = async (req, res, next) => {
    const { email, password} = req.body;
    let exisitingUser;
    try {
        exisitingUser = await User.findOne({ email });
    } catch (err) {
        return res.status(500).json({message: "error occured while querying database"});
    }
    if (!exisitingUser) {
        return res.status(404).json({message: "Couldnt get A user By this email"});
    }


    const isPasswordCorrect = bcrypt.compareSync(password, exisitingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({message: "Incorrect Password"})
    }
    return res.status(200).json({message: "login successsful"});
};

export const profile = async (req, res, next) => {
    const {userId, fullName, email, phone, location, skills, experience, education, resume, linkedIn, github, portfolio } = req.body;

    let existingProfile;
    try {
        existingProfile = await UserProfile.findOne({email});
    } catch (err) {
        return res.status(500).json({message: "error accessing database"});
    }
    if (existingProfile) {
        return res.status(400).json({message: "profile already exists"});
    }

    const userProfile = new UserProfile({
        userId,
        fullName,
        email,
        phone,
        location,
        skills,
        experience,
        education,
        resume,
        linkedIn,
        github,
        portfolio
    });

    try {
        await userProfile.save();
    } catch (err) {
        res.status(500).json({message: "error accessing database"});
    }
    res.status(201).json({userProfile});

};

export const updateUserProfile = async (req, res, next) => {
    const { phone, location, skills, experience,  resume, portfolio } = req.body;
    const profileId = req.params.id.trim();
    let updateProfile
    try {
      updateProfile = await UserProfile.findOneAndUpdate(
        { _id: profileId },
            { phone, location, skills, experience, resume, portfolio },
            { new: true, runValidators: true }
    );
    } catch (err) {
        return res.status(500).json({message: "error accessing database"});
    }
    if (!updateProfile) {
        return res.status(500).json({message: "unable to update profile"})
    }
    return res.status(200).json({ updateProfile });
};

export const getAllProfile = async (req, res, next) => {
    let allProfiles;
    try {
      allProfiles = await UserProfile.find();
    } catch (err) {
        return res.status(500).json({message: "databse couldnt be accessed"});       
    }
    if (!allProfiles) {
        return res.status(404).json({message: "No Profiles found"});
    }
    return res.status(200).json({ allProfiles });
};