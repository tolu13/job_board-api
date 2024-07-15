import mongoose from "mongoose";


const Schema = mongoose.Schema;

const companySchema = new Schema ({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    industry: { type: String},
    description: { type: String},
    jobsPosted: [{
        type: mongoose.Types.ObjectId,
        ref: "Job"
    }]

});
export default mongoose.model("Company", companySchema);