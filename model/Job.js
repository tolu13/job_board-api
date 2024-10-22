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
        type: String,
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
        status: {type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending'},
        coverLetter: { type: String},
        appliedAt: { type: Date, default: Date.now}
    }],
});
export default  mongoose.model("Job", jobSchema);