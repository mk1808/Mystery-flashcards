"use client"
import { StatusType } from '@/enums/StatusOptions';
import useAlert from '@/hooks/useAlert';
import { FlashcardSetT } from '@/models/FlashcardSet';
import { UserFlashcardT } from '@/models/UserFlashcard';
import useLocaleStore from '@/stores/useLocaleStore';
import { postUserFlashcardSet } from '@/utils/client/ApiUtils';
import React from 'react'

function AddWantToLearnActions({ flashcardSet, userFlashcard }: { flashcardSet: FlashcardSetT, userFlashcard: UserFlashcardT }) {
    const { dictionary } = useLocaleStore(state => state);
    const { addErrorAlert, addSuccessAlert } = useAlert()

    const deleteAddWantToLearnTrigger = () => document.getElementById("addWantToLearn")!.innerHTML = "";

    async function onSubmit() {
        const body: UserFlashcardT = {
            flashcardSetId: flashcardSet._id,
            type: StatusType.WANT_TO_LEARN,
            isFavorite: userFlashcard?.isFavorite
        }
        try {
            const response = await postUserFlashcardSet(body);
            deleteAddWantToLearnTrigger();
            addSuccessAlert(dictionary.common.addWantToLearnSuccess)
        } catch (errorResponse: any) {
            addErrorAlert(errorResponse.body.message)
        }
    }
    return (
        <>
            <button className="btn ml-3">{dictionary.common.close}</button>
            <button className="btn btn-primary ml-3" onClick={onSubmit}> {dictionary.common.confirm}</button>
        </>
    )
}

export default AddWantToLearnActions