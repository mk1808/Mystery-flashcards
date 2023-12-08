import FlashcardContainer from '@/components/common/FlashcardContainer';
import { FlashcardT } from '@/models/Flashcard';
import { HeartIcon } from '@heroicons/react/24/outline';
import React from 'react'

export default function NewFlashcards({ params }: { params: { id: String } }) {
  const singleFlashcard: FlashcardT = {
    wordLang1: "słowo",
    wordLang2: "word",
    description1: "Jakiś opis słowa",
    description2: "Some description"
  }

  const flashcards: FlashcardT[] = Array(20).fill(singleFlashcard);
  return (
    <>
      <div className="w-[1000px]">
        {renderActionButtons()}
        {flashcards.map(card => <FlashcardContainer key={card.wordLang1} card={card} />)}
      </div>
      <div>FlashcardsDetails {params.id}</div>
    </>
  )

  function renderActionButtons() {
    return (
      <div className="mb-12 flex justify-end">
        <button className="btn btn-primary mr-10">Ucz się tej kolekcji</button>
        <div className="tooltip tooltip-bottom" data-tip="Dodaj do ulubionych">
          <button className="btn btn-primary"> &nbsp;<HeartIcon className="h-6 w-6" /> &nbsp; </button>
        </div>
      </div>
    )
  }
}
