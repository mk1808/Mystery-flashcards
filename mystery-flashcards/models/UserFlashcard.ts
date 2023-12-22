import { Schema, SchemaTypes, model, models } from 'mongoose';
import { AnswerT, answerSchema } from './Answer';

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
  isFavorite: {
    type: Boolean
  },
  type: {
    type: String,
    required: [true, 'type is required.'],
  }
});

const UserFlashcard = models.UserFlashcard || model('UserFlashcard', userFlashcardSchema);

export type UserFlashcardT = {
  _id?: string,
  userId?: string,
  flashcardSetId?: string,
  learningHistory?: AnswerT[],
  isFavorite: boolean,
  type?: string
};

export default UserFlashcard;