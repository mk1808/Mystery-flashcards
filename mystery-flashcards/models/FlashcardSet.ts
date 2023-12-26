import mongoose, { Schema, SchemaTypes, model, models } from 'mongoose';
import { FlashcardT, flashcardSchema } from './Flashcard';
import { UserT } from './User';
import { UserFlashcardT } from './UserFlashcard';

const flashcardSetSchema = new Schema({
    user: {
        type: SchemaTypes.Mixed,
        required: [true, 'user is required.'],
    },
    name: {
        type: String,
        required: [true, 'name is required.'],
    },
    level: {
        type: String,
        required: [true, 'level is required.'],
    },
    hashtags: {
        type: []
    },
    flashcards: {
        type: [flashcardSchema]
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    creationDate: {
        type: Date,
        default: new Date()
    },
    lang1: {
        type: String,
        required: [true, 'lang1 is required.'],
    },
    lang2: {
        type: String,
        required: [true, 'lang2 is required.'],
    }
});

const FlashcardSet = models.FlashcardSet || model('FlashcardSet', flashcardSetSchema);

export type FlashcardSetT = {
    _id?: string,
    user?: UserT,
    name?: string,
    level?: string,
    hashtags?: string[],
    flashcards?: FlashcardT[],
    isPublic?: boolean,
    creationDate?: Date,
    lang1?: string,
    lang2?: string,
    userFlashcard?: UserFlashcardT
};

export default FlashcardSet;