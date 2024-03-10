import path from "path";
import express, {Express} from "express";
import swaggerUI from "swagger-ui-express";
import bodyParser from "body-parser";
import {router as usersRouter} from "../v1/routes/users";
import swaggerDocument from "./docs/swagger.json";

const app: Express = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use("/book", express.static(path.join(path.dirname(__filename), "public")));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export {app};

