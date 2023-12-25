import TestCardContent from '@/components/learn/test/TestCardContent';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { getFlashcardSetRequest, getTestFlashcardsRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

export default async function LearnTest({
  params,
  searchParams,
}: {
  params: { id: string, locale: string },
  searchParams: { direction: string },
}) {
  const dictionary = await fetchDictionary(params.locale);

  const flashcardSet = await executeServerSideRequest(getFlashcardSetRequest, params.id);
  const { flashcards } = await executeServerSideRequest(getTestFlashcardsRequest, params.id);
  const view = "TEST";

  return (
    <TestCardContent dictionary={dictionary} flashcardSet={flashcardSet} testFlashcards={flashcards} view={view} direction={searchParams.direction} locale={params.locale} />
  )
}
