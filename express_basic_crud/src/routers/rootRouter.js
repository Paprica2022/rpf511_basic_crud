import express from "express";
import { postJoin, postLogin } from "../controllers/userController";
import { publicOnlyMiddleware } from "../middleware";

const rootRouter = express.Router();

rootRouter.get("/", (req,res) => {
    res.json({message : "api home"});
});


rootRouter.route("/join").all(publicOnlyMiddleware).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).post(postLogin);


export default rootRouter;