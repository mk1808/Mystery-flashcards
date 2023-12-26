import NewFlashcardButtons from '@/components/flashcards/NewFlashcardButtons';
import NewFlashcardListForm from '@/components/flashcards/NewFlashcardListForm';
import { FlashcardSetT } from '@/models/FlashcardSet';
import { getFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

export default async function FlashcardsEdit({ params }: { params: { id: String } }) {
  const flashcardSetId = params.id;
  const { flashcardSet }: { flashcardSet: FlashcardSetT } = await executeServerSideRequest(getFlashcardSetRequest, flashcardSetId);

  return (
    <div className="h-full">
      <NewFlashcardButtons editedFlashCardSet={flashcardSet} />
      <NewFlashcardListForm />
    </div>
  )
}
