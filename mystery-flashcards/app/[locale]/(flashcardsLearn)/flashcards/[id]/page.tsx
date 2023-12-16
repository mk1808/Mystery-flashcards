import FlashcardContainer from '@/components/common/FlashcardContainer';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { FlashcardT } from '@/models/Flashcard'
import { getFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { createCookieHeader } from '@/utils/client/RestUtils';
import { HeartIcon } from "@heroicons/react/24/outline"
import { cookies } from 'next/headers';
import React from 'react'

export default async function FlashcardsDetails({ params }: { params: { locale: string, id: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  const flashcardSetId = params.id;
  const flashcardSet = await getFlashcardSetRequest(flashcardSetId, createCookieHeader(cookies()));

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
        {flashcards.map(card => <FlashcardContainer dictionary={dictionary} key={card.wordLang1} card={card} />)}
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
