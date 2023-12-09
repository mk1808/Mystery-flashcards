import NewFlashcardListForm from '@/components/flashcards/NewFlashcardListForm';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { FlashcardT } from '@/models/Flashcard';
import React from 'react'

async function NewFlashcards({ params }: { params: { id: String, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
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
        <NewFlashcardListForm dictionary={dictionary} flashcards={flashcards}/>
      </div>
    </>
  )

  function renderActionButtons() {
    return (
      <div className="mb-12 flex justify-end">
        <button className="btn btn-secondary btn-outline bg-base-100 mr-10">Anuluj</button>
        <button className="btn btn-primary">Zapisz</button>
      </div>
    )
  }
}

export default NewFlashcards;
