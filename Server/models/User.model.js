import mongoose from "mongoose";
import jwt from "jsonwebtoken";

//define schema 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minglength: 3,
        maxlength: 255,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        minglength: 6,
        required: true,
        maxlength: 255,
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
    return token;
};

//create model 

const User = mongoose.model("User", userSchema);
export { User };