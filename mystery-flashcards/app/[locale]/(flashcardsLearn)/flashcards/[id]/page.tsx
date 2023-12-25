import FlashcardContainer from '@/components/common/FlashcardContainer';
import AddToFavModal from '@/components/flashcards/flashcardDetails/AddToFavModal';
import AddWantToLearnModal from '@/components/flashcards/flashcardDetails/AddWantToLearnModal';
import StartLearningModal from '@/components/flashcards/flashcardDetails/StartLearningModal';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { getFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

export default async function FlashcardsDetails({ params }: { params: { locale: string, id: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  const flashcardSetId = params.id;
  const { flashcardSet, statistics, userFlashcard }: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, flashcardSetId);
  const showWantToLearn = !userFlashcard || userFlashcard.type === "NONE"

  return (
    <div>
      {renderActionButtons()}
      {flashcardSet?.flashcards?.map(card => <FlashcardContainer dictionary={dictionary} key={card.wordLang1} card={card} />)}
    </div>
  )

  function renderActionButtons() {
    return (
      <div className="mb-12 flex justify-end">
        <StartLearningModal dictionary={dictionary} flashcardSet={flashcardSet} locale={params.locale} />
        <AddToFavModal dictionary={dictionary} flashcardSet={flashcardSet} userFlashcard={userFlashcard!} />
        {showWantToLearn &&
          <AddWantToLearnModal dictionary={dictionary} flashcardSet={flashcardSet} userFlashcard={userFlashcard!} />
        }
      </div>
    )
  }
}
