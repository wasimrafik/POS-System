import express from "express";
import { addSales, deleteSales, getAllSales, getSingleSales, updateSales } from "../Controllers/sales.controllers";


const salesRouter = express.Router();





salesRouter.get("/getAllSales", getAllSales);
salesRouter.get("/getSingleSales/:salesID", getSingleSales);
salesRouter.post("/addSales", addSales);
salesRouter.put("/updateSales/:salesID", updateSales);
salesRouter.delete("/deleteSales/:salesID", deleteSales);

export default salesRouter;