import FlashcardContainer from '@/components/common/FlashcardContainer';
import AddToFavModal from '@/components/flashcards/flashcardDetails/AddToFavModal';
import AddWantToLearnModal from '@/components/flashcards/flashcardDetails/AddWantToLearnModal';
import StartLearningModal from '@/components/flashcards/flashcardDetails/StartLearningModal';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { getFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

async function FlashcardsDetails({ params }: { params: { id: string } }) {
  const flashcardSetId = params.id;
  const { flashcardSet, userFlashcard }: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, flashcardSetId);
  const showWantToLearn = !userFlashcard || userFlashcard.type === "NONE"

  return (
    <div>
      {renderActionButtons()}
      {flashcardSet?.flashcards?.map(card => <FlashcardContainer key={card.wordLang1} card={card} />)}
    </div>
  )

  function renderActionButtons() {
    return (
      <div className="mb-12 flex justify-end">
        <StartLearningModal flashcardSet={flashcardSet} />
        <AddToFavModal flashcardSet={flashcardSet!} userFlashcard={userFlashcard!} />
        {showWantToLearn &&
          <AddWantToLearnModal flashcardSet={flashcardSet!} userFlashcard={userFlashcard!} />
        }
      </div>
    )
  }
}

export default FlashcardsDetails