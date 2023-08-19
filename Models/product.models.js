import mongoose, { trusted } from "mongoose";

const Schema = mongoose.Schema;

const product = new Schema({
    productName:{
        type: String,
        required: true
    },
    productDiscription:{
        type: String,
        required: true
    },
    productPrice:{
        type: Number,
        required: true,
    },
    productQuantity:{
        type: Number,
        default: 0
    },
    productBrand:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});


export default mongoose.model("product",product);