import FlashcardsDetailsSidebar from "@/components/flashcards/flashcardDetails/FlashcardsDetailsSidebar";
import { FlashCardSetDto } from "@/dtos/FlashCardSetDto";
import { getFlashcardSetRequest } from "@/utils/client/ApiUtils";
import { executeServerSideRequest } from "@/utils/server/restUtils";
import React from 'react'

export default async function DetailsSidebar({ params }: { params: { id: string } }) {
  const flashcardSetId = params.id;
  const { flashcardSet, userFlashcard, testResult, statistics }: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, flashcardSetId);

  return (
    <FlashcardsDetailsSidebar flashcardSet={flashcardSet} userFlashcard={userFlashcard} testResult={testResult} statistics={statistics} />
  )
}
