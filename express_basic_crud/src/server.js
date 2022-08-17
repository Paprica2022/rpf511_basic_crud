import "./db";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";


var corsOptions = {
    origin : process.env.REACT_URL
}


const app = express();
const logger = morgan("dev");

app.use(cors(corsOptions));

app.use(express.json());



app.use("/",rootRouter);
app.use("/user",userRouter);
app.use("/api", apiRouter);

export default app;