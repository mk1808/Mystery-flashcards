"use client"
import { AlertType } from '@/enums/AlertType';
import { FlashcardSetT } from '@/models/FlashcardSet';
import useAlertStore from '@/stores/useAlertStore';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';
import { createFlashcardSetRequest, updateFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'

function NewFlashcardButtons({
    editedFlashCardSet,
    dictionary
}: {
    editedFlashCardSet?: FlashcardSetT,
    dictionary: any
}) {
    const sidebarForm = useNewFlashcardSetStore((state) => state.sidebarForm);
    const flashcardsList = useNewFlashcardSetStore((state) => state.flashcardsList);
    const sidebarFormValid = useNewFlashcardSetStore((state) => state.sidebarFormValid);
    const flashcardListInvalidCount = useNewFlashcardSetStore((state) => state.flashcardListInvalidCount);
    const sidebarSubmitBtnRef = useRef<any>(null);
    const addAlert = useAlertStore((state) => state.add)
    const router = useRouter();
    const isFormValid = () => sidebarFormValid && flashcardListInvalidCount === 0;
    const prepareFlashcard = () => {
        const updatedFlashcardsList = flashcardsList.slice(0, flashcardsList.length - 1);
        updatedFlashcardsList.forEach((card: any) => delete card._id)
        return { ...sidebarForm, flashcards: updatedFlashcardsList };
    }
    const saveFlashcard = async () => {
        const formToSave = prepareFlashcard();
        let response;
        try {
            if (editedFlashCardSet) {
                response = await updateFlashcardSetRequest(editedFlashCardSet._id!, formToSave);
                console.log(response);
            } else {
                response = await createFlashcardSetRequest(formToSave);
                console.log(response);
            }
            const id = response?._id;
            router.push(`/flashcards/${id}`);
        } catch (errorResponse: any) {
            addAlert({ type: AlertType.error, title: getNestedFieldByPath(dictionary, errorResponse?.body?.message) })
        }
    }

    const onSubmit = () => {
        sidebarSubmitBtnRef.current.click();
        if (isFormValid()) {
            saveFlashcard();
            return;
        }
        if (!sidebarFormValid) { addAlert({ type: AlertType.error, title: dictionary.common.errorsInSidebar }) }
        if (flashcardListInvalidCount !== 0) { addAlert({ type: AlertType.error, title: dictionary.common.errorsOnCardsList }) }
    };

    const onCancel = () => {
        router.push("/");
    }

    return (
        <div className="mb-12 flex justify-end">
            <button className="btn btn-secondary btn-outline bg-base-100 mr-10" onClick={onCancel}>{dictionary.common.cancel}</button>
            <button className="btn btn-primary" onClick={onSubmit}>{dictionary.common.save}</button>
            <button className="btn hidden" type='submit' form="sidebarForm" ref={sidebarSubmitBtnRef}>submit</button>
        </div>
    )
}

export default NewFlashcardButtons