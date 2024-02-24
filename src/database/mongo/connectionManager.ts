import * as dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
import logger from "../../utilities/logger";

let reconnectInterval : number;
let timeout: number;
const mongoHost: string = process.env.MONGODB_HOST || 'mongodb://127.0.0.1:27017/booking-app?';

// Try to figure out if the MongoDB reconnect interval has been properly set or not.
if (process.env.MONGODB_RECONNECT_INTERVAL) {
    if (isNaN(parseInt(process.env.MONGODB_RECONNECT_INTERVAL))) {
        logger.debug('MongoDB reconnect interval set in .env file is not valid. Setting default of 3000');
        reconnectInterval = 3000;
    }
} else {
    logger.debug('MongoDB reconnect interval not set in .env file. Setting default of 3000');
    reconnectInterval = 3000;
}

// Try to figure out if the MongoDB timeout has been properly set or not.
if (process.env.MONGODB_TIMEOUT) {
    if (isNaN(parseInt(process.env.MONGODB_TIMEOUT))) {
        logger.debug('MongoDB timeout set in .env file is not valid. Setting default of 3000');
        timeout = 3000;
    }
} else {
    logger.debug('MongoDB timeout not set in .env file. Setting default of 3000');
    timeout = 3000;
}

mongoose.connection.on('connected', () => logger.info('Successfully connected to MongoDB!'));
mongoose.connection.on('reconnected', () => logger.info('Successfully reconnected to MongoDB!'));
mongoose.connection.on('disconnected', async () => {
    logger.warn('Connection to MongoDB was lost. Retrying...');
    await connect();
});
mongoose.connection.on('closed', () => logger.info('Successfully disconnected from MongoDB!'));
mongoose.connection.on('error', (error) => {
    logger.error(`MongoDB connection error: ${error.type}: ${error.message}`);
});

export async function connect(){
    try {
        await mongoose.connect(mongoHost);
    } catch (error) {
        logger.error('Could not connect to MongoDB. Retrying...');
        setTimeout(async () => {await connect()}, reconnectInterval);
    }
}