import TestResultsSidebar from '@/components/learn/test/TestResultsSidebar';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { UserT } from '@/models/User';
import { getFlashcardSetRequest, getWhoAmi } from '@/utils/client/ApiUtils';
import { findNextRang, getRang } from '@/utils/server/userRangUtils';
import { cookies } from 'next/headers';
import React, { use } from 'react'

export default async function LearnTestResultsSidebar({ params }: { params: { id: string, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  const headers = {
    cookie: 'token=' + cookies().get('token')?.value
  }

  const flashcardSetDto: FlashCardSetDto = await getFlashcardSetRequest(params.id, headers);
  const user: UserT = await getWhoAmi(headers);

  return <TestResultsSidebar dictionary={dictionary} flashcardSetDto={flashcardSetDto} user={user} />
}
