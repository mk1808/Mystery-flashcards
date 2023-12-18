import NewFlashcardForm from '@/components/flashcards/NewFlashcardForm';
import NewFlashcardNumber from '@/components/flashcards/NewFlashcardNumber';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { FlashcardSetT } from '@/models/FlashcardSet';
import { getFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { createCookieHeader } from '@/utils/client/RestUtils';
import { cookies } from 'next/headers';
import React from 'react'

export default async function FlashcardsEditSidebar({ params }: { params: { id: string, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  const flashcardSetId = params.id;
  const { flashcardSet }: { flashcardSet: FlashcardSetT } = await getFlashcardSetRequest(flashcardSetId, createCookieHeader(cookies()));

  return (
    <div>
      <h1 className="text-4xl text-center mt-3 mb-8">{flashcardSet.name}</h1>
      <div className="divider"></div>
      <NewFlashcardNumber dictionary={dictionary} />
      <NewFlashcardForm dictionary={dictionary} flashcardSet={flashcardSet} />
    </div>
  )
}
