import TrainingCardContent from '@/components/learn/training/TrainingCardContent'
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { getFlashcardSetRequest, postAnswersAndReturnCards } from '@/utils/client/ApiUtils';
import React from 'react'
import { cookies } from 'next/headers'
import { createCookieHeader } from '@/utils/client/RestUtils';

export default async function LearnTraining({
  params,
  searchParams
}: {
  params: { id: string, locale: string },
  searchParams: { direction: string }
}) {
  const dictionary = await fetchDictionary(params.locale);
  const headers = createCookieHeader(cookies());

  const flashcardSet = await getFlashcardSetRequest(params.id, headers);
  const roundFlashcards = await postAnswersAndReturnCards(params.id, [], headers);
  const view = "TRAINING";
  console.log("roundFlashcards", roundFlashcards)
  return (
    <TrainingCardContent dictionary={dictionary} flashcardSet={flashcardSet} roundFlashcards={roundFlashcards} view={view} direction={searchParams.direction} />
  )
}