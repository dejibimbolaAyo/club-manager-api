import { nodeEnv, appName, logStars, address } from './config';
import io from "./connections/socket"
// import mongoose from './database/config/connection';
import userRouter from "./api/routers/user";
// import passport from "passport";
import express from "express";


io;
const server = express();
server.use('/api/v1/', userRouter);

// Start server
server.listen(address.port, () => {
    console.info(`${appName} is started on`, address.hostname +':'+ address.port);
});