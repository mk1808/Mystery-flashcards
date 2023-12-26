import NewFlashcardForm from '@/components/flashcards/NewFlashcardForm';
import NewFlashcardNumber from '@/components/flashcards/NewFlashcardNumber';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { getFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { executeServerSideRequest } from '@/utils/server/restUtils';
import React from 'react'

async function FlashcardsEditSidebar({ params }: { params: { id: string } }) {
    const flashcardSetId = params.id;
    const { flashcardSet }: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, flashcardSetId);

    return (
        <div>
            <h1 className="text-4xl text-center mt-3 mb-8">{flashcardSet?.name}</h1>
            <div className="divider" />
            <NewFlashcardNumber />
            <NewFlashcardForm flashcardSet={flashcardSet} />
        </div>
    )
}

export default FlashcardsEditSidebar