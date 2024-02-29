import express, {Express} from "express";

import {router as usersRouter} from "../v1/routes/users";

const app: Express = express();

app.use("/api/v1/users", usersRouter);

export {app};

