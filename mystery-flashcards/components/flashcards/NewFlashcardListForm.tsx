"use client"
import React, { useEffect, useRef } from 'react'
import FlashcardContainer from '../common/FlashcardContainer'
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';

function NewFlashcardListForm({ dictionary, flashcards }: { dictionary: any, flashcards?: any }) {
    const flashcardsList = useNewFlashcardSetStore((state) => state.flashcardsList)

    return (
        flashcardsList.map((card: any) =>
            <FlashcardContainer
                key={card._id}
                card={card}
                dictionary={dictionary}
                isForm={true} />
        )
    )
}

export default NewFlashcardListForm