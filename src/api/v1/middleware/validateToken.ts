import express from "express";
import * as jwt from "jsonwebtoken";
import logger from "../../../utilities/logger";
import {ErrorResponseBody} from "../types/errorResponse";

let tokenSignSecret: string;

if (process.env.TOKEN_SIGN_SECRET === undefined) {
    logger.error("UNDEFINED TOKEN SIGN SECRET");
    process.exit(0);
} else {
    tokenSignSecret = process.env.TOKEN_SIGN_SECRET;
}

function validateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    // First, make sure there is a token in the first place.
    let authHeader: string | undefined = req.header('Authorization');

    if (authHeader === undefined) {
        logger.warn('Token validation failed: No token was attached to the incoming request.');
        let errorResponse: ErrorResponseBody = {
            error: "MissingTokenError",
            details: "Request Authorization field not set."
        }
        return res.status(401).send(errorResponse);
    }

    // If the token exists, make sure it is a JWT token.
    const tokenPrefix = authHeader.split(" ")[0];
    if (tokenPrefix !== "Bearer") {
        logger.warn('Token validation failed: Incoming token not a valid JWT token.');
        let errorResponse: ErrorResponseBody = {
            error: "InvalidTokenError",
            details: "The supplied token is not a valid JWT token."
        }
        return res.status(400).send(errorResponse);
    }

    const token = authHeader.split(" ")[1];

    // If the request has a valid JWT token attached, check to see if it has expired.
    try {
        jwt.verify(token, tokenSignSecret);
    } catch (error: any) {
        logger.warn(`Token validation failed: ${error.message}`);
        let errorResponse: ErrorResponseBody = {
            error: error.name,
            details: error.message
        }
        return res.status(400).send(errorResponse);
    }
    next();
}

export {validateToken};