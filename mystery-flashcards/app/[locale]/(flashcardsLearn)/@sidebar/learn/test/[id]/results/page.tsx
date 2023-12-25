import TestResultsSidebar from '@/components/learn/test/TestResultsSidebar';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { UserT } from '@/models/User';
import { getFlashcardSetRequest, getWhoAmi } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React, { use } from 'react'

export default async function LearnTestResultsSidebar({ params }: { params: { id: string, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);

  const flashcardSetDto: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, params.id);
  const user: UserT = await executeServerSideRequest(getWhoAmi);

  return <TestResultsSidebar dictionary={dictionary} flashcardSetDto={flashcardSetDto} user={user} />
}
