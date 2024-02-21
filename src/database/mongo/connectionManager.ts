import * as dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";

let reconnectInterval : number;
let timeout: number;
const mongoHost: string = process.env.MONGODB_HOST || 'mongodb://127.0.0.1:27017/booking-app';

// Try to figure out if the the MongoDB reconnect interval has been properly set or not.
if (process.env.MONGODB_RECONNECT_INTERVAL) {
    if (isNaN(parseInt(process.env.MONGODB_RECONNECT_INTERVAL))) {
        console.debug('MongoDB reconnect interval set in .env file is not valid. Setting default of 3000');
        reconnectInterval = 3000;
    }
} else {
    console.debug('MongoDB reconnect interval not set in .env file. Setting default of 3000');
    reconnectInterval = 3000;
}

// Try to figure out if the MongoDB timeout has been properly set or not.
if (process.env.MONGODB_TIMEOUT) {
    if (isNaN(parseInt(process.env.MONGODB_TIMEOUT))) {
        console.debug('MongoDB timeout set in .env file is not valid. Setting default of 3000');
        timeout = 3000;
    }
} else {
    console.debug('MongoDB timeout not set in .env file. Setting default of 3000');
    timeout = 3000;
}

export async function connect(){
    try {
        await mongoose.connect(
             mongoHost, {
                 socketTimeoutMS: timeout
            }
        )
    } catch (error) {
        console.error('Could not connect to MongoDB. Retrying...');
        setTimeout(async () => {await connect()}, reconnectInterval);
    }
    // After connection has been established, set up connection event handlers.
    mongoose.connection.on('connected', () => console.debug('Successfully connected to MongoDB!'));
    mongoose.connection.on('reconnected', () => console.debug('Successfully reconnected to MongoDB!'));
    mongoose.connection.on('disconnected', async () => {
        console.warn('Connection to MongoDB was lost. Retrying...');
        await connect();
    });
    mongoose.connection.on('closed', () => console.debug('Successfully disconnected from MongoDB!'));
    mongoose.connection.on('error', (error) => {
        console.error(`MongoDB connection error: ${error.type}: ${error.message}`);
    });
    return;
}