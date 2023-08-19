import express from "express";
import { createUser, deleteUser, getUser, updateUser, userLogin } from "../Controllers/user.controllers";

const userRouter = express.Router();


userRouter.get("/getUser", getUser)
userRouter.post("/createUser",createUser)
userRouter.put("/updateUser/:userID", updateUser)
userRouter.delete("/deleteUser/:userID", deleteUser)
userRouter.put("/userLogin", userLogin)

export default userRouter;