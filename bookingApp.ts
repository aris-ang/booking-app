import {connect} from "./src/database/mongo/connectionManager"

async function main() {
    await connect();
}

main().then(() => console.log('Success!'));