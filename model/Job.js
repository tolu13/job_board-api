import mongoose from "mongoose";
import Company from "./Company.js";


const Schema = mongoose.Schema;

const jobSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
    },
    requirements: {
        type: [String]
    },
    responsibilities: {
        type: [String]
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    applications: [{
        candidateName: {type: String, required: true },
        email: { type: String, required: true },
        resume: {type: String, required: true },
        coverLetter: { type: String},
        appliedAt: { type: Date, default: Date.now}
    }],
});
export default  mongoose.model("Job", jobSchema);