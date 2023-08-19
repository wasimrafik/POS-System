import mongoose, { Schema } from "mongoose";

const schema = mongoose.schema;

const customers = new Schema({
    customerName:{
        type: String,
        required: true,
    },
    mobile:{
        type: Number,
        default: null,
    },
    ordersHistory:{
        type: String,
        default: null,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});


export default mongoose.model("customers", customers)