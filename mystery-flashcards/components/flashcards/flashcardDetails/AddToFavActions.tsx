"use client"
import { StatusType } from '@/enums/StatusOptions'
import useAlert from '@/hooks/useAlert'
import { FlashcardSetT } from '@/models/FlashcardSet'
import { UserFlashcardT } from '@/models/UserFlashcard'
import useLocaleStore from '@/stores/useLocaleStore'
import { postUserFlashcardSet } from '@/utils/client/ApiUtils'
import React from 'react'

const emptyHeart = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>`
const fullHeart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
<path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
</svg>
`

function AddToFavActions({ flashcardSet }: { flashcardSet: FlashcardSetT }) {
    const { dictionary } = useLocaleStore(state => state);
    const { addErrorAlert, addSuccessAlert } = useAlert();

    async function onSubmit() {
        const body: UserFlashcardT = {
            flashcardSetId: flashcardSet._id,
            type: StatusType.NONE,
            isFavorite: true
        }
        try {
            updateTrigger(await postUserFlashcardSet(body));
            addSuccessAlert(dictionary.common.addToFavSuccess);
        } catch (errorResponse: any) {
            addErrorAlert(errorResponse.body.message)
        }
    }

    function updateTrigger(response: UserFlashcardT) {
        const addToFavTrigger = document.getElementById("addToFavTrigger")!
        addToFavTrigger.innerHTML = response.isFavorite ? fullHeart : emptyHeart;
        addToFavTrigger.setAttribute("data-tip", dictionary.common.alreadyInFavorites);
    }

    return (
        <>
            <button className="btn ml-3">{dictionary.common.close}</button>
            <button className="btn btn-primary ml-3" onClick={onSubmit}> {dictionary.common.confirm}</button>
        </>
    )
}

export default AddToFavActions