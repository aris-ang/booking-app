import {model, Schema, Types} from "mongoose";

interface ITimeslot {
    startsAt: Date
    totalAvailableBookings: bigint,
    active: boolean
}

interface ISchedule {
    sunday: Types.DocumentArray<ITimeslot>,
    monday: Types.DocumentArray<ITimeslot>,
    tuesday: Types.DocumentArray<ITimeslot>,
    wednesday: Types.DocumentArray<ITimeslot>,
    thursday: Types.DocumentArray<ITimeslot>,
    friday: Types.DocumentArray<ITimeslot>,
    saturday: Types.DocumentArray<ITimeslot>,
}

const scheduleSchema = new Schema<ISchedule>({
    sunday: [{
        startsAt: {
            type: Date,
            required: true
        },
        totalAvailableBookings: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        }
    }],
    monday: [{
        startsAt: {
            type: Date,
            required: true
        },
        totalAvailableBookings: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        }
    }],
    tuesday: [{
        startsAt: {
            type: Date,
            required: true
        },
        totalAvailableBookings: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        }
    }],
    wednesday: [{
        startsAt: {
            type: Date,
            required: true
        },
        totalAvailableBookings: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        }
    }],
    thursday: [{
        startsAt: {
            type: Date,
            required: true
        },
        totalAvailableBookings: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        }
    }],
    friday: [{
        startsAt: {
            type: Date,
            required: true
        },
        totalAvailableBookings: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        }
    }],
    saturday: [{
        startsAt: {
            type: Date,
            required: true
        },
        totalAvailableBookings: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        }
    }]
});

export const Schedule = model<ISchedule>('Schedule', scheduleSchema);