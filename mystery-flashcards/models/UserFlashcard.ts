import { Schema, SchemaTypes, model, models } from 'mongoose';
import { answerSchema } from './Answer';

const userFlashcardSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'userId is required.'],
  },
  flashcardSetId: {
    type: Schema.Types.ObjectId,
    required: [true, 'flashcardSetId is required.'],
  },
  learningHistory: {
    type: [answerSchema],
    default: []
  },
  type: {
    type: String,
    required: [true, 'type is required.'],
  }
});

const UserFlashcard = models.UserFlashcard || model('UserFlashcard', userFlashcardSchema);

export default UserFlashcard;