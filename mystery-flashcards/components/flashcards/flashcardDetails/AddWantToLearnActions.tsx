"use client"
import { AlertType } from '@/enums/AlertType';
import useAlertStore from '@/stores/useAlertStore';
import useLocaleStore from '@/stores/useLocaleStore';
import { postUserFlashcardSet } from '@/utils/client/ApiUtils';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import React from 'react'

function AddWantToLearnActions({ flashcardSet, userFlashcard }: { flashcardSet: any, userFlashcard: any }) {
    const { dictionary } = useLocaleStore(state => state);
    const addAlert = useAlertStore((state) => state.add)
    const onSubmit = async () => {

        const body = {
            flashcardSetId: flashcardSet._id,
            type: "WANT_TO_LEARN",
            isFavorite: userFlashcard?.isFavorite
        }
        try {
            const response = await postUserFlashcardSet(body);
            document.getElementById("addWantToLearn")!.innerHTML = ""
            addAlert({ type: AlertType.success, title: dictionary.common.addWantToLearnSuccess })
        } catch (errorResponse: any) {
            addAlert({ type: AlertType.error, title: getNestedFieldByPath(dictionary, errorResponse.body.message) })
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