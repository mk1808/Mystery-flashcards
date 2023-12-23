import TestResultTable from '@/components/learn/test/TestResultTable'
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { getFlashcardSetRequest, getTestFlashcardsRequest } from '@/utils/client/ApiUtils';
import { cookies } from 'next/headers';
import React from 'react'

export default async function LearnTestResults({ params }: { params: { id: string, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  const headers = {
    cookie: 'token=' + cookies().get('token')?.value
  }

  const flashcardSetDto = await getFlashcardSetRequest(params.id, headers);
  const view = "TEST_RESULT"

  return (
    <TestResultTable flashcardSetDto={flashcardSetDto} dictionary={dictionary} view={view} locale={params.locale} />
  )
}
