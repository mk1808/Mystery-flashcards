import { Schema, SchemaTypes, model, models } from 'mongoose';

export const answerSchema = new Schema({
    flashcardId: {
        type: Schema.Types.ObjectId,
        required: [true, 'flashcardId is required.'],
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