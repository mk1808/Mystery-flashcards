import TestCardContent from '@/components/learn/test/TestCardContent';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { getFlashcardSetRequest, getTestFlashcardsRequest } from '@/utils/client/ApiUtils';
import { cookies } from 'next/headers';
import React from 'react'

export default async function LearnTest({ params }: { params: { id: string, locale: string } }) {
  const tempId = "656b7e961c783fdd82116774";
  const dictionary = await fetchDictionary(params.locale);
  const headers = {
    cookie: 'token=' + cookies().get('token')?.value
  }

  const flashcardSet = await getFlashcardSetRequest(tempId/*params.id*/, headers);
  const { flashcards } = await getTestFlashcardsRequest(tempId/*params.id*/, headers);

  return (
    <TestCardContent dictionary={dictionary} flashcardSet={flashcardSet} testFlashcards={flashcards} />
  )
}
