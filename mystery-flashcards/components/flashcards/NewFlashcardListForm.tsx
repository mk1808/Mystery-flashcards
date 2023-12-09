"use client"
import React from 'react'
import FlashcardContainer from '../common/FlashcardContainer'
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';


function NewFlashcardListForm({ dictionary, flashcards }: { dictionary: any, flashcards: any }) {

    const flashcardsList = useNewFlashcardSetStore((state) => state.flashcardsList)
    const addFlashcard = useNewFlashcardSetStore((state) => state.addFlashcard)
    console.log(JSON.stringify(flashcardsList[0]))
    return (
        <>
            {flashcardsList.map((card: any) =>
                <FlashcardContainer
                    key={card._id}
                    card={card}
                    dictionary={dictionary}
                    onDelete={onDelete} />
            )}
            <button type="button" className="btn btn-secondary btn-outline bg-base-100 mr-10" onClick={addFlashcard}>zmien</button>
        </>
    )

    function onDelete() {
        console.log("onDelete")
    }
}

export default NewFlashcardListForm