import express from 'express';
import { addCustomer, deleteCustomer, getAllCustomer, getSingleCustomer, updateCustomer } from '../Controllers/customer.controllers';


const customerRouter = express.Router();



customerRouter.get("/getAllCustomer", getAllCustomer);
customerRouter.get("/getSingleCustomer/:custID", getSingleCustomer);
customerRouter.post("/addCustomer", addCustomer);
customerRouter.put("/updateCustomer/:custID", updateCustomer);
customerRouter.delete("/deleteCustomer/:custID", deleteCustomer);

export default customerRouter;