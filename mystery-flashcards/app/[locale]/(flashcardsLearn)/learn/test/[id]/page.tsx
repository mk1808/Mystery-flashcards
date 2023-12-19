import TestCardContent from '@/components/learn/test/TestCardContent';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { getFlashcardSetRequest, getTestFlashcardsRequest } from '@/utils/client/ApiUtils';
import { cookies } from 'next/headers';
import React from 'react'

export default async function LearnTest({ params }: { params: { id: string, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  const headers = {
    cookie: 'token=' + cookies().get('token')?.value
  }

  const flashcardSet = await getFlashcardSetRequest(params.id, headers);
  const { flashcards } = await getTestFlashcardsRequest(params.id, headers);

  return (
    <TestCardContent dictionary={dictionary} flashcardSet={flashcardSet} testFlashcards={flashcards} />
  )
}
