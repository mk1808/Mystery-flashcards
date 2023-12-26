import mongoose from 'mongoose';

let isConnected = false;

export default async function connectToDB() {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || "", {
            dbName: process.env.DB_NAME
        })
        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}