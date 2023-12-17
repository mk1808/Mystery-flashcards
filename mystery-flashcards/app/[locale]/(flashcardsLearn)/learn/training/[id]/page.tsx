import TrainingCardContent from '@/components/learn/training/TrainingCardContent'
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { getFlashcardSetRequest, postAnswersAndReturnCards } from '@/utils/client/ApiUtils';
import React from 'react'
import { cookies } from 'next/headers'
import { createCookieHeader } from '@/utils/client/RestUtils';

export default async function LearnTraining({ params }: { params: { id: string, locale: string } }) {
  const tempId = "656a2c5d573e1d09a12fd05a";
  const dictionary = await fetchDictionary(params.locale);
  const headers = createCookieHeader(cookies());

  const flashcardSet = await getFlashcardSetRequest(tempId/*params.id*/, headers);
  const roundFlashcards = await postAnswersAndReturnCards(tempId, []/*params.id*/, headers);
  const view = "TRAINING";
  console.log("roundFlashcards", roundFlashcards)
  return (
    <TrainingCardContent dictionary={dictionary} flashcardSet={flashcardSet} roundFlashcards={roundFlashcards} view={view} />
  )
}