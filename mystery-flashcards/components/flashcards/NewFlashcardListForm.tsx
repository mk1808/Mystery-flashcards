"use client"
import React, { useEffect, useRef } from 'react'
import FlashcardContainer from '../common/FlashcardContainer'
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';

function NewFlashcardListForm({ dictionary, flashcards }: { dictionary: any, flashcards?: any }) {
    const flashcardsList = useNewFlashcardSetStore((state) => state.flashcardsList)
    const addNewFlashcard = useNewFlashcardSetStore((state) => state.addNewFlashcard)
    const addEditedFlashcard = useNewFlashcardSetStore((state) => state.addEditedFlashcard)
    const deleteFlashcard = useNewFlashcardSetStore((state) => state.deleteFlashcard)

    const initOnceRef = useRef(false)

    useEffect(() => {
        if (flashcards && !initOnceRef.current) {
            initOnceRef.current = true;
            deleteFlashcard(flashcardsList[0])
            flashcards.forEach(addEditedFlashcard)
            addNewFlashcard();
        }
    }, [flashcards])

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