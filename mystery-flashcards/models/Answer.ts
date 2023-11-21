import { Schema, SchemaTypes, model, models } from 'mongoose';

const answerSchema = new Schema({
    flashcard: {
        type: SchemaTypes.Mixed,
        required: [true, 'flashcard is required.'],
    },
    isCorrect: {
        type: Boolean,
        required: [true, 'isCorrect is required.'],
    },
    givenAnswer: {
        type: SchemaTypes.Mixed,
        required: [true, 'givenAnswer is required.'],
    }
});

const Answer = models.Answer || model('Answer', answerSchema);

export default Answer;