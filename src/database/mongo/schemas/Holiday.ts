import {model, Schema, Types} from "mongoose";
import {Service} from "./Service";

interface IHoliday {
    title: string,
    service: Types.ObjectId | Record<string, unknown>,
    startsAt: Date,
    endsAt: Date
}

const holidaySchema = new Schema<IHoliday>({
    title: {type: String, required:true},
    service: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Service
    },
    startsAt: {type: Date, required: true},
    endsAt: {type: Date, required: true}
});

export const Holiday = model<IHoliday>('Holiday', holidaySchema);