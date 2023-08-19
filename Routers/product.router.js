import express  from "express";
import { addProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from "../Controllers/product.controllers";




const productRouter = express.Router();


productRouter.get("/getAllProduct", getAllProduct);
productRouter.get("/getSingleProduct/:productID", getSingleProduct);
productRouter.post("/addProduct",addProduct);
productRouter.put("/updateProduct/:productID", updateProduct);
productRouter.delete("/deleteProduct/:productID", deleteProduct);


export default productRouter;