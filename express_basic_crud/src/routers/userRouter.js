import express from "express";
import { postEdit } from "../controllers/userController";
import { protectedMiddleware } from "../middleware";

const userRouter = express.Router();


userRouter.route("/edit").all(protectedMiddleware).post(postEdit);

export default userRouter;