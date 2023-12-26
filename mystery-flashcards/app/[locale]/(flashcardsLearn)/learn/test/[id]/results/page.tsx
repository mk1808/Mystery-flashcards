import TestResultTable from '@/components/learn/test/TestResultTable'
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { LearnViewOptions } from '@/enums/LearnViewOptions';
import { getFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

async function LearnTestResults({ params }: { params: { id: string } }) {
    const flashcardSetDto: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, params.id);

    return (
        <TestResultTable flashcardSetDto={flashcardSetDto} view={LearnViewOptions.TEST_RESULT} />
    )
}

export default LearnTestResults