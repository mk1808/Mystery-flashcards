import NewFlashcardForm from '@/components/flashcards/NewFlashcardForm';
import NewFlashcardNumber from '@/components/flashcards/NewFlashcardNumber';
import { FlashcardSetT } from '@/models/FlashcardSet';
import { getFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

export default async function FlashcardsEditSidebar({ params }: { params: { id: string } }) {
  const flashcardSetId = params.id;
  const { flashcardSet }: { flashcardSet: FlashcardSetT } = await executeServerSideRequest(getFlashcardSetRequest, flashcardSetId);

  return (
    <div>
      <h1 className="text-4xl text-center mt-3 mb-8">{flashcardSet.name}</h1>
      <div className="divider"></div>
      <NewFlashcardNumber />
      <NewFlashcardForm flashcardSet={flashcardSet} />
    </div>
  )
}
