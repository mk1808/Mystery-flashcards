import TrainingCardContent from '@/components/learn/training/TrainingCardContent'
import { getFlashcardSetRequest, postAnswersAndReturnCards } from '@/utils/client/ApiUtils';
import React from 'react'
import { executeServerSideRequest } from '@/utils/server/restUtils';

export default async function LearnTraining({
  params,
  searchParams
}: {
  params: { id: string },
  searchParams: { direction: string }
}) {

  const flashcardSet = await executeServerSideRequest(getFlashcardSetRequest, params.id);
  const roundFlashcards = await executeServerSideRequest(postAnswersAndReturnCards, params.id, []);
  const view = "TRAINING";
  console.log("roundFlashcards", roundFlashcards)
  return (
    <TrainingCardContent flashcardSet={flashcardSet} roundFlashcardsProp={roundFlashcards} view={view} direction={searchParams.direction} />
  )
}