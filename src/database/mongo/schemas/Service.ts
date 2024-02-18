import {model, Schema, Types} from "mongoose";
import {Schedule} from "./Schedule";

interface IService {
    title: string,
    schedule: Types.ObjectId | Record<string, unknown>
}

const serviceSchema = new Schema<IService>({
    title: {type: String, required:true},
    schedule: {
        type: Types.ObjectId,
        required: true,
        ref: Schedule
    },
});

export const Service = model<IService>('Service', serviceSchema);