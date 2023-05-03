import express, { Router } from "express";
import { requestHandler } from "../middlewares/request.handler";
import { getUsers } from "../controller/users";
import {
    createEmployee,
    deleteEmployee,
    readEmployee,
    updateEmployee
} from "../controller/employee"
const userRouter: Router = express.Router();

userRouter.get("/", requestHandler(getUsers));

userRouter.post("/", createEmployee)

userRouter.get("/:id", readEmployee)

userRouter.delete("/:id", deleteEmployee)

userRouter.patch("/:id", updateEmployee)

export default userRouter;
