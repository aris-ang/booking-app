import {model, Schema, Types} from "mongoose";

interface ISubscription {
    title: string,
    service: Types.ObjectId,
    user: Types.ObjectId,
    activatedAt: Date,
    expiresAt: Date
}

const subscriptionSchema = new Schema<ISubscription>({
    title: {type: String, required:true},
    service: {type: Types.ObjectId, required: true},
    user: {type: Types.ObjectId, required: true},
    activatedAt: {type: Date, required: true},
    expiresAt: {type: Date, required: true}
});

export const Subscription = model<ISubscription>('Subscription', subscriptionSchema)