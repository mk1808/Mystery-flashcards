"use client"
import { AlertType } from '@/enums/AlertType';
import useAlert from '@/hooks/useAlert';
import { FlashcardSetT } from '@/models/FlashcardSet';
import useLocaleStore from '@/stores/useLocaleStore';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';
import { createFlashcardSetRequest, updateFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'

function NewFlashcardButtons({ editedFlashCardSet }: { editedFlashCardSet?: FlashcardSetT }) {
    const { dictionary, locale } = useLocaleStore(state => state);
    const { sidebarForm, flashcardsList, sidebarFormValid, flashcardListInvalidCount } = useNewFlashcardSetStore((state) => state);
    const { addErrorAlert, addSuccessAlert } = useAlert();
    const sidebarSubmitBtnRef = useRef<any>(null);
    const router = useRouter();

    const isFormValid = () => sidebarFormValid && flashcardListInvalidCount === 0;
    const showSaveSuccessAlert = () => addSuccessAlert(editedFlashCardSet ? dictionary.common.successfulSetUpdate : dictionary.common.successfulSetSave);
    const onCancel = () => router.push(`/${locale}`);

    const prepareFlashcard = () => {
        const updatedFlashcardsList = flashcardsList.slice(0, flashcardsList.length - 1);
        updatedFlashcardsList.forEach(card => delete card._id)
        return { ...sidebarForm, flashcards: updatedFlashcardsList };
    }

    const sendSaveFlashcardRequest = async (formToSave: NewFlashcardSetForm) => {
        if (editedFlashCardSet) {
            return await updateFlashcardSetRequest(editedFlashCardSet._id!, formToSave);
        }
        return await createFlashcardSetRequest(formToSave);
    }

    const saveFlashcard = async () => {
        const formToSave = prepareFlashcard();
        try {
            const response: FlashcardSetT = await sendSaveFlashcardRequest(formToSave)
            showSaveSuccessAlert();
            router.push(`/${locale}/flashcards/${response._id}`);
        } catch (errorResponse: any) {
            addErrorAlert(errorResponse?.body?.message);
        }
    }

    const onSubmit = () => {
        sidebarSubmitBtnRef.current.click();
        if (isFormValid()) { return saveFlashcard(); }
        if (!sidebarFormValid) { addErrorAlert(dictionary.common.errorsInSidebar) }
        if (flashcardListInvalidCount !== 0) { addErrorAlert(dictionary.common.errorsOnCardsList) }
    };

    return (
        <div className="mb-12 flex justify-end">
            <button className="btn btn-secondary btn-outline bg-base-100 mr-10" onClick={onCancel}> {dictionary.common.cancel} </button>
            <button className="btn btn-primary" onClick={onSubmit}> {dictionary.common.save} </button>
            <button className="btn hidden" type='submit' form="sidebarForm" ref={sidebarSubmitBtnRef}>submit</button>
        </div>
    )
}

export default NewFlashcardButtons