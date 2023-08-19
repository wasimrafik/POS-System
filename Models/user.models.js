import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const users = new Schema({
    userName:{
        type: String,
        required: true,
        // unique: true,
    },
    password:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    role:{
        type: String,
        required: true,
        roleType:["Admin", "Manager","salesperson"],
        default: "salesperson"
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
});

export default mongoose.model("users", users)