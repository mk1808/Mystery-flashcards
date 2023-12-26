import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    mail: {
        type: String,
        required: [true, 'mail is required.'],
    },
    password: {
        type: String,
        required: [true, 'password is required.'],
    },
    name: {
        type: String,
        required: [true, 'name is required.'],
    },
    avatar: {
        type: String
    },
    points: {
        type: Number,
        default: 0,
        required: [true, 'points is required.'],
    },
    rang: {
        type: Number,
        required: [true, 'rang is required.'],
    },
    statistics: {
        type: [],
        default: []
    },
});

const User = models.User || model('User', userSchema);

export type UserT = {
    _id?: string,
    mail?: string,
    password?: string,
    name?: string,
    avatar?: string,
    points: number,
    rang?: number,
    statistics?: {
        type?: [],
        default?: []
    }
};

export default User;