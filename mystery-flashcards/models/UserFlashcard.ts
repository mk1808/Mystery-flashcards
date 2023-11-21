import { Schema, SchemaTypes, model, models } from 'mongoose';

const userFlashcardSchema = new Schema({
  user: {
    type: SchemaTypes.Mixed,
    required: [true, 'user is required.'],
  },
  flashcardSet: {
    type: SchemaTypes.Mixed,
    required: [true, 'flashcardSet is required.'],
  },
  learningHistory: {
    type: []
  },
  type: {
    type: String,
    required: [true, 'type is required.'],
  }
});

const UserFlashcard = models.UserFlashcard || model('UserFlashcard', userFlashcardSchema);

export default UserFlashcard;