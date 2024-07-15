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

export const createCompany = async (req, res, next) => {
    const {user_id, name, industry, description} = req.body;
    
    const company = new Company({
        user_id,
        name,
        industry,
        description
    });

    try {
      await company.save();  
    } catch (err) {
        console.log(err);
    }
    return res.status(201).json({company});
};
