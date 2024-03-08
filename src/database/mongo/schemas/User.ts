import {model, Schema} from "mongoose";
interface IUser {
    email: string;
    password: string;
    createdAt: Date;
    enabled: boolean;
    claims: string[];
}

const userSchema = new Schema<IUser>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, required: true},
    enabled: {type: Boolean, required: true, default: true},
    claims: [{type: String, required: true, default: ["user"]}]
});

export const User = model<IUser>('User', userSchema);