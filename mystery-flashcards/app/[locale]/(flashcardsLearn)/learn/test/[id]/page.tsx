import TestCardContent from '@/components/learn/test/TestCardContent';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { DirectionType } from '@/enums/DirectionOptions';
import { LearnViewOptions } from '@/enums/LearnViewOptions';
import { FlashcardSetT } from '@/models/FlashcardSet';
import { getFlashcardSetRequest, getTestFlashcardsRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

async function LearnTest({ params, searchParams, }: { params: { id: string }, searchParams: { direction: DirectionType } }) {
    const flashcardSet: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, params.id);
    const { flashcards }: FlashcardSetT = await executeServerSideRequest(getTestFlashcardsRequest, params.id);

    return (
        <TestCardContent
            flashcardSet={flashcardSet}
            testFlashcards={flashcards!}
            view={LearnViewOptions.TEST}
            direction={searchParams.direction}
        />
    )
}

export default LearnTest