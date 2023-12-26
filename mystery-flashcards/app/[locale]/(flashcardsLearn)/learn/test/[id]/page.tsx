import TestCardContent from '@/components/learn/test/TestCardContent';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { DirectionType } from '@/enums/DirectionOptions';
import { LearnViewOptions, LearnViewType } from '@/enums/LearnViewOptions';
import { FlashcardSetT } from '@/models/FlashcardSet';
import { getFlashcardSetRequest, getTestFlashcardsRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

async function LearnTest({
  params,
  searchParams,
}: {
  params: { id: string },
  searchParams: { direction: DirectionType },
}) {

  const flashcardSet: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, params.id);
  const { flashcards }: FlashcardSetT = await executeServerSideRequest(getTestFlashcardsRequest, params.id);
  const view: LearnViewType = LearnViewOptions.TEST;

  return (
    <TestCardContent flashcardSet={flashcardSet} testFlashcards={flashcards!} view={view} direction={searchParams.direction} />
  )
}

export default LearnTest