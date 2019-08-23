import express from "express";

import {appName, address } from './config';
import userRouter from "./api/routers/user";

const server = express();

server.use('/api/v1/', userRouter);
// Start server
server.listen(address.port, () => {
    console.info(`${appName} is started on`, address.hostname +':'+ address.port);
});