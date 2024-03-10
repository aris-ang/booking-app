import jwt from "jsonwebtoken";
import logger from "../../../utilities/logger";
import {ErrorResponseBody} from "../types/errorResponse";

let tokenSignSecret: string;
if (process.env.TOKEN_SIGN_SECRET === undefined) {
    logger.error("UNDEFINED TOKEN SIGN SECRET");
    process.exit(0);
} else {
    tokenSignSecret = process.env.TOKEN_SIGN_SECRET;
}
export function createToken(userId: string, duration: number, claims: string[]):
    {
        error: string | undefined,
        token: string | null
    }
{
    let token;
    try {
        token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + ((60 * duration) * 60),
            userId: userId,
            claims: claims
        }, tokenSignSecret);
    } catch (error: any) {
        logger.warn(`Token signing failed: ${error.name} - ${error.message}`);
        let errorResponse: ErrorResponseBody = {
            error: error.name,
            details: error.message
        }
        return {
            error: error.name,
            token: null
        }
    }
    return {
        error: undefined,
        token: token
    }
}