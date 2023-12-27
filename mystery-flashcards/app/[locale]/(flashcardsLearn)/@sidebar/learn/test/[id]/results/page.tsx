import TestResultsSidebar from '@/components/learn/test/TestResultsSidebar';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { UserT } from '@/models/User';
import { getFlashcardSetRequest, getWhoAmi } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

async function LearnTestResultsSidebar({ params }: { params: { id: string } }) {
    const flashcardSetDto: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, params.id);
    const user: UserT = await executeServerSideRequest(getWhoAmi);

    return (
        <TestResultsSidebar flashcardSetDto={flashcardSetDto} user={user} />
    )
}

export default LearnTestResultsSidebar