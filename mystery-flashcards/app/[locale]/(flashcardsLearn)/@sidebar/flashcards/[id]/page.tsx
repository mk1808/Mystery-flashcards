import FlashcardsDetailsSidebar from "@/components/flashcards/flashcardDetails/FlashcardsDetailsSidebar";
import { FlashCardSetDto } from "@/dtos/FlashCardSetDto";
import { getFlashcardSetRequest } from "@/utils/client/ApiUtils";
import { executeServerSideRequest } from "@/utils/server/restUtils";
import React from 'react'

async function DetailsSidebar({ params }: { params: { id: string } }) {
    const flashcardSetId = params.id;
    const flashCardSetDto: FlashCardSetDto = await executeServerSideRequest(getFlashcardSetRequest, flashcardSetId);

    return (
        <FlashcardsDetailsSidebar flashCardSetDto={flashCardSetDto} />
    )
}

export default DetailsSidebar