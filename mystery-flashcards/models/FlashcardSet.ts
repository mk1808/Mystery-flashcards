import { Schema, SchemaTypes, model, models } from 'mongoose';

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
        type: []
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

export default FlashcardSet;