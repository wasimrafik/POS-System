import express from "express";
import mongoose from "mongoose";
import userRouter from './Routers/user.router'
import productRouter from "./Routers/product.router";
import customerRouter from "./Routers/customer.router";
import salesRouter from "./Routers/sales.router";



const app = express();

const PORT = process.env.PORT || 8003

app.listen(PORT, () =>{
    console.log("Your PORT IS CONNECTED AT ",PORT);
})


app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/POS-System")
.then(()=>{console.log("Mongoose is Connected");})


app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/customer",customerRouter);
app.use("/sales", salesRouter)