import {model, Schema, Types} from "mongoose";
import {Service} from "./Service";
import {User} from "./User";
import {Subscription} from "./Subscription";

interface IBooking {
    service: Types.ObjectId | Record<string, unknown>,
    user: Types.ObjectId | Record<string, unknown>,
    subscription: Types.ObjectId | Record<string, unknown>,
    timestamp: Date,
    createdAt:Date
}

const bookingSchema = new Schema<IBooking>({
    service: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Service
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    subscription: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: Subscription
    },
    timestamp: {type: Date, required: true},
    createdAt: {type: Date, required: true}
});

export const Booking = model<IBooking>('Booking', bookingSchema)