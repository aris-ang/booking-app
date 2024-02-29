import dotenv from "dotenv";
dotenv.config();
import {connect} from "./src/database/mongo/connectionManager"
import {app} from "./src/api/v1/app";
import logger from "./src/utilities/logger";

const expressPort: number = process.env.EXPRESS_SERVER_PORT ? isNaN(parseInt(process.env.EXPRESS_SERVER_PORT)) ? 5000 : parseInt(process.env.EXPRESS_SERVER_PORT) : 5000;
async function main() {
    await connect();
    app.listen(
        expressPort,
        () => logger.info(`Express Server listening on port ${expressPort}`)
    );
}

main().then(() => console.log('Success!'));