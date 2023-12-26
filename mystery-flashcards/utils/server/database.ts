import mongoose from 'mongoose';

let isConnected = false;
const DB_NAME = "mysteryFlashcards";

export default async function connectToDB() {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || "", {
            dbName: DB_NAME
        })
        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}