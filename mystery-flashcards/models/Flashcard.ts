import { Schema, SchemaTypes, model, models } from 'mongoose';

const flashcardSchema = new Schema({
    wordLang1: {
        type: String,
        required: [true, 'wordLang1 is required.'],
    },
    wordLang2: {
        type: String,
        required: [true, 'wordLang2 is required.'],
    },
    description1: {
        type: String
    },
    description2: {
        type: String
    }
});

const Flashcard = models.Flashcard || model('Flashcard', flashcardSchema);

export default Flashcard;