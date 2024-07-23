import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z\s]*$/.test(v)
            },
            message: props => `${props.value} must contaion onlt letters and spaces`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/ .test(v);
            },
            message: props =>`${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    user_type: {
        type: String,
        enum: ['job_seeker','company' ],
        default: 'job_seeker'
    }
});
export default mongoose.model("User", userSchema);

// users in the mongoDB