import Modal from '@/components/common/Modal'
import React from 'react'
import { HeartIcon } from "@heroicons/react/24/outline"
import AddToFavActions from './AddToFavActions'
import AddToFavContent from './AddToFavContent'

function AddToFavModal({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
    return <Modal modalTrigger={renderDialogTrigger()}
        dialogHeader={renderDialogHeader()}
        dialogContent={renderDialogContent()}
        dialogActions={<AddToFavActions dictionary={dictionary} flashcardSet={flashcardSet} />}
        width="w-5/12"
    />

    function renderDialogTrigger() {
        return (
            <div className="tooltip tooltip-bottom" data-tip={dictionary.common.addToFavorites}>
                <button className="btn btn-primary"> &nbsp;<HeartIcon className="h-6 w-6" /> &nbsp; </button>
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