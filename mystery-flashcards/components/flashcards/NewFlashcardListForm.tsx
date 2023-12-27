"use client"
import FlashcardContainer from '../common/FlashcardContainer'
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';

function NewFlashcardListForm() {
    const { flashcardsList } = useNewFlashcardSetStore((state) => state)

    return (
        flashcardsList.map(card =>
            <FlashcardContainer
                key={card._id}
                card={card}
                isForm />
        )
    )
}

export default NewFlashcardListForm