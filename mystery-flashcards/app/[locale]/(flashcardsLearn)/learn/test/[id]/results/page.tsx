import TestResultTable from '@/components/learn/test/TestResultTable'
import { getFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

export default async function LearnTestResults({ params }: { params: { id: string } }) {

  const flashcardSetDto = await executeServerSideRequest(getFlashcardSetRequest, params.id);
  const view = "TEST_RESULT"

  return (
    <TestResultTable flashcardSetDto={flashcardSetDto} view={view} />
  )
}
