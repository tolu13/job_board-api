import Company from "../model/Company.js";


export const getAllCompanies = async (req, res, next) => {
  try {  
    const Companies = await Company.find(); 
    return res.status(200).json({Companies});
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: "Internal server error"});
  }   
};