import TestCardContent from '@/components/learn/test/TestCardContent';
import { getFlashcardSetRequest, getTestFlashcardsRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

export default async function LearnTest({
  params,
  searchParams,
}: {
  params: { id: string },
  searchParams: { direction: string },
}) {

  const flashcardSet = await executeServerSideRequest(getFlashcardSetRequest, params.id);
  const { flashcards } = await executeServerSideRequest(getTestFlashcardsRequest, params.id);
  const view = "TEST";

  return (
    <TestCardContent flashcardSet={flashcardSet} testFlashcards={flashcards} view={view} direction={searchParams.direction} />
  )
}
