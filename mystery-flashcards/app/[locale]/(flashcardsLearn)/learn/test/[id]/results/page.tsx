import TestResultTable from '@/components/learn/test/TestResultTable'
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { getFlashcardSetRequest, getTestFlashcardsRequest } from '@/utils/client/ApiUtils';
import { cookies } from 'next/headers';
import React from 'react'

export default async function LearnTestResults({ params }: { params: { id: string, locale: string } }) {
  const tempId = "656b7e961c783fdd82116774";
  const dictionary = await fetchDictionary(params.locale);
  const headers = {
    cookie: 'token=' + cookies().get('token')?.value
  }

  const flashcardSetDto = await getFlashcardSetRequest(tempId/*params.id*/, headers);

  return (
    <TestResultTable flashcardSetDto={flashcardSetDto} />
  )
}
