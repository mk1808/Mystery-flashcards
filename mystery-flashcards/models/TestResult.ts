import { Schema, SchemaTypes, model, models } from 'mongoose';
import { AnswerT, answerSchema } from './Answer';

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

export type TestResultT = {
    _id?: string,
    userId?: string,
    flashcardSetId?: string,
    resultPercent?: Number,
    validCount?: Number,
    allCount?: Number,
    answers?: AnswerT[],
    direction?: string
};

export default TestResult;