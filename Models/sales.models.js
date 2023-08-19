import mongoose, { SchemaTypeOptions } from "mongoose";

const Schema = mongoose.Schema;

const sales = new Schema({
    custID:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "customers",
    },
    userID:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    productID:{
        type: Schema.Types.ObjectId,
        required: true,
        as: "products"
    },
    salesDate:{
        type: Date,
        default: Date.now()
    },
    totalAmount:{
        type: Number,
        default: 0,
    },
    paymentMethod:{
        type: String,
        required: true,
    },
    paymentStatus:{
        type: String,
        required: true,
        default: "pending",
    },
    orderStatus:{
        type: String,
        required: true,
        default: "pending",
    },
    discount:{
        type: Number,
        default: 0,
    },
    customerName:{
        type: String,
        default: null,
    },
    mobile:{
        type: Number,
        default: null
    }
});

export default mongoose.model("sales", sales)