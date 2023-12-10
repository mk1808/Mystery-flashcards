"use client"
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';
import { createFlashcardSetRequest } from '@/utils/client/ApiUtils';
import React from 'react'

function NewFlashcardButtons() {
    const sidebarForm = useNewFlashcardSetStore((state) => state.sidebarForm);
    const flashcardsList = useNewFlashcardSetStore((state) => state.flashcardsList);
    const sidebarFormValid = useNewFlashcardSetStore((state) => state.sidebarFormValid);
    const flashcardListInvalidCount = useNewFlashcardSetStore((state) => state.flashcardListInvalidCount);

    const isFormValid = ()=>sidebarFormValid && flashcardListInvalidCount === 0;

    const onSubmit = async () => {
        const updatedFlashcardsList = flashcardsList.slice(0, flashcardsList.length - 1);
        updatedFlashcardsList.forEach((card: any) => delete card._id)
        const formToSave = { ...sidebarForm, flashcards: updatedFlashcardsList };
        console.log(formToSave)
        const response = await createFlashcardSetRequest(formToSave);

        console.log(response);
    };

    return (
        <div className="mb-12 flex justify-end">
            <button className="btn btn-secondary btn-outline bg-base-100 mr-10">Anuluj</button>
            <button className="btn btn-primary" onClick={onSubmit} disabled={!isFormValid()}>Zapisz</button>
        </div>
    )

}

export default NewFlashcardButtons