import TrainingCardContent from '@/components/learn/training/TrainingCardContent'
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { getFlashcardSetRequest, postAnswersAndReturnCards } from '@/utils/client/ApiUtils';
import React from 'react'
import { executeServerSideRequest } from '@/utils/server/restUtils';

export default async function LearnTraining({
  params,
  searchParams
}: {
  params: { id: string, locale: string },
  searchParams: { direction: string }
}) {
  const dictionary = await fetchDictionary(params.locale);

  const flashcardSet = await executeServerSideRequest(getFlashcardSetRequest, params.id);
  const roundFlashcards = await executeServerSideRequest(postAnswersAndReturnCards, params.id, []);
  const view = "TRAINING";
  console.log("roundFlashcards", roundFlashcards)
  return (
    <TrainingCardContent dictionary={dictionary} flashcardSet={flashcardSet} roundFlashcards={roundFlashcards} view={view} direction={searchParams.direction} />
  )
}