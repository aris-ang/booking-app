import {model, Schema, Types} from "mongoose";
import {User} from "./User";
import {Service} from "./Service";

interface ISubscription {
    title: string,
    service: Types.ObjectId | Record<string, unknown>,
    user: Types.ObjectId | Record<string, unknown>,
    activatedAt: Date,
    expiresAt: Date
}

const subscriptionSchema = new Schema<ISubscription>({
    title: {type: String, required:true},
    service: {
        type: Types.ObjectId,
        required: true,
        ref: Service
    },
    user: {
        type: Types.ObjectId,
        required: true,
        ref: User
    },
    activatedAt: {type: Date, required: true},
    expiresAt: {type: Date, required: true}
});

export const Subscription = model<ISubscription>('Subscription', subscriptionSchema)