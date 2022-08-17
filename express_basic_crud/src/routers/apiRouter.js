import express from "express";
import { getToken } from "../controllers/apiController";
import { protectedMiddleware } from "../middleware";

const apiRouter = express.Router();

apiRouter.route("/token").all(protectedMiddleware).get(getToken);


export default apiRouter;