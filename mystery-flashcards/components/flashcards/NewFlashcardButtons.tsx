"use client"
import useRest from '@/hooks/useRest';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';
import React from 'react'

function NewFlashcardButtons() {
    const { createFlashcardSet } = useRest();
    const sidebarForm = useNewFlashcardSetStore((state) => state.sidebarForm);
    const flashcardsList = useNewFlashcardSetStore((state) => state.flashcardsList);


    const onSubmit = async () => {
        const updatedFlashcardsList = flashcardsList.slice(0, flashcardsList.length - 1);
        updatedFlashcardsList.forEach((card: any) => delete card._id)
        const formToSave = { ...sidebarForm, flashcards: updatedFlashcardsList };
        console.log(formToSave)
        const response = await createFlashcardSet(formToSave);

        console.log(response);
    };

    return (
        <div className="mb-12 flex justify-end">
            <button className="btn btn-secondary btn-outline bg-base-100 mr-10">Anuluj</button>
            <button className="btn btn-primary" onClick={onSubmit}>Zapisz</button>
        </div>
    )

}

export default NewFlashcardButtons