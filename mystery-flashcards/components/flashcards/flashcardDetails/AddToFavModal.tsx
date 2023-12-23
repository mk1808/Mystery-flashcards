import Modal from '@/components/common/Modal'
import React from 'react'
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as FullHeartIcon } from "@heroicons/react/24/solid"
import AddToFavActions from './AddToFavActions'
import AddToFavContent from './AddToFavContent'
import { UserFlashcardT } from '@/models/UserFlashcard'

function AddToFavModal({ dictionary, flashcardSet, userFlashcard }: { dictionary: any, flashcardSet: any, userFlashcard: UserFlashcardT }) {
    const isFav = userFlashcard?.isFavorite;

    return <Modal modalTrigger={renderDialogTrigger()}
        dialogHeader={renderDialogHeader()}
        dialogContent={renderDialogContent()}
        dialogActions={<AddToFavActions dictionary={dictionary} flashcardSet={flashcardSet} />}
        width="w-5/12"
        disabled={isFav}
    />

    function renderDialogTrigger() {
        return (
            <div className="tooltip tooltip-bottom" id="addToFavTooltip" data-tip={isFav ? dictionary.common.alreadyInFavorites : dictionary.common.addToFavorites}>
                <button className="btn btn-primary px-10" id='addToFavTrigger'>
                    {isFav == true ? <FullHeartIcon className="h-6 w-6" /> : <HeartIcon className="h-6 w-6" />}
                </button>
            </div>
        )
    }

    function renderDialogHeader() {
        return <h2 className="font-bold text-3xl">{dictionary.common.addToFavoritesTitle}</h2>
    }

    function renderDialogContent() {
        return <AddToFavContent dictionary={dictionary} flashcardSet={flashcardSet} />
    }
}

export default AddToFavModal