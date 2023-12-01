import { Schema, SchemaTypes, model, models } from 'mongoose';
import { answerSchema } from './Answer';

const testResultSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'userId is required.'],
    },
    flashcardSetId: {
        type: Schema.Types.ObjectId,
        required: [true, 'flashcardSetId is required.'],
    },
    resultPercent: {
        type: Number
    },
    validCount: {
        type: Number
    },
    allCount: {
        type: Number
    },
    answers: {
        type: [answerSchema],
        default: []
    },
    direction: {
        type: String,
        required: [true, 'direction is required.'],
    }
});

const TestResult = models.TestResult || model('TestResult', testResultSchema);

export default TestResult;