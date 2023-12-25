"use client"

import FlashcardContainer from '../common/FlashcardContainer'
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';

function NewFlashcardListForm() {
    const flashcardsList = useNewFlashcardSetStore((state) => state.flashcardsList)

    return (
        flashcardsList.map((card: any) =>
            <FlashcardContainer
                key={card._id}
                card={card}
                isForm={true} />
        )
    )
}

export default NewFlashcardListForm