import express, {Express} from "express";
import swaggerUI from "swagger-ui-express";

import {router as usersRouter} from "../v1/routes/users";
import swaggerDocument from "./docs/swagger.json";

const app: Express = express();

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export {app};

