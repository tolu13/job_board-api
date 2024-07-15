import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    location: {
        type: String
    },
    skills: { type: [String] },
    experience: { type: String },
    education: { type: String },
    resume: { type: String },
    linkedIn: { type: String },
    github: { type: String },
    portfolio: { type: String},
    createdAt: {type: Date, default: Date.now}
}) ;

export default mongoose.model("UserProfile", userProfileSchema);