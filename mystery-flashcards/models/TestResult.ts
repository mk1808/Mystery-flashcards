import { Schema, SchemaTypes, model, models } from 'mongoose';

const testResultSchema = new Schema({
    user: {
        type: SchemaTypes.Mixed,
        required: [true, 'user is required.'],
    },
    flashcardSet: {
        type: SchemaTypes.Mixed,
        required: [true, 'flashcardSet is required.'],
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
        type: [],
        default: []
    },
    direction: {
        type: String,
        required: [true, 'direction is required.'],
    }
});

const TestResult = models.TestResult || model('TestResult', testResultSchema);

export default TestResult;