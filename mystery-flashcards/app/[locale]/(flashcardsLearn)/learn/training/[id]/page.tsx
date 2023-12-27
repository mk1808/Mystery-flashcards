import TrainingCardContent from '@/components/learn/training/TrainingCardContent'
import { getFlashcardSetRequest, postAnswersAndReturnCards } from '@/utils/client/ApiUtils';
import React from 'react'
import { executeServerSideRequest } from '@/utils/server/restUtils';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { FlashcardT } from '@/models/Flashcard';
import { DirectionType } from '@/enums/DirectionOptions';
import { LearnViewOptions } from '@/enums/LearnViewOptions';

async function LearnTraining({
    params,
    searchParams
}: {
    params: { id: string },
    searchParams: { direction: DirectionType }
}) {
    const flashcardSet: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, params.id);
    const roundFlashcards: FlashcardT[] = await executeServerSideRequest(postAnswersAndReturnCards, params.id, []);

    return (
        <TrainingCardContent
            flashcardSet={flashcardSet}
            roundFlashcardsProp={roundFlashcards}
            view={LearnViewOptions.TRAINING}
            direction={searchParams.direction}
        />
    )
}

export default LearnTraining