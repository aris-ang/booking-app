import {model, Schema, Types} from "mongoose";

interface IBooking {
    service: Types.ObjectId,
    user: Types.ObjectId,
    subscription: Types.ObjectId,
    timestamp: Date
}

const bookingSchema = new Schema<IBooking>({
    service: {type: Types.ObjectId, required: true},
    user: {type: Types.ObjectId, required: true},
    subscription: {type: Types.ObjectId, required: true},
    timestamp: {type: Date, required: true}
});

export const Booking = model<IBooking>('Booking', bookingSchema)