import NewFlashcardButtons from '@/components/flashcards/NewFlashcardButtons';
import NewFlashcardListForm from '@/components/flashcards/NewFlashcardListForm';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { getFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

async function FlashcardsEdit({ params }: { params: { id: String } }) {
    const flashcardSetId = params.id;
    const { flashcardSet }: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, flashcardSetId);

    return (
        <div className="h-full">
            <NewFlashcardButtons editedFlashCardSet={flashcardSet} />
            <NewFlashcardListForm />
        </div>
    )
}

export default FlashcardsEdit