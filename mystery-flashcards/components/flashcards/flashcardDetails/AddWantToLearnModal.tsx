import Modal from '@/components/common/Modal';
import React from 'react'
import AddWantToLearnActions from './AddWantToLearnActions';
import AddWantToLearnContent from './AddWantToLearnContent';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import { UserFlashcardT } from '@/models/UserFlashcard';

function AddWantToLearnModal({ dictionary, flashcardSet, userFlashcard }: { dictionary: any, flashcardSet: any, userFlashcard: UserFlashcardT }) {
    const isFav = userFlashcard?.isFavorite;

    return <Modal modalTrigger={renderDialogTrigger()}
        dialogHeader={renderDialogHeader()}
        dialogContent={renderDialogContent()}
        dialogActions={<AddWantToLearnActions dictionary={dictionary} flashcardSet={flashcardSet} />}
        width="w-5/12"

    />

    function renderDialogTrigger() {
        return (
            <div className="tooltip tooltip-bottom" id="addWantToLearn" data-tip={dictionary.common.wantToLearn}>
                <button className="btn btn-primary px-10 ml-2">
                    <FolderPlusIcon className="h-6 w-6" />
                </button>
            </div>
        )
    }

    function renderDialogHeader() {
        return <h2 className="font-bold text-3xl">{dictionary.common.wantToLearnTitle}</h2>
    }

    function renderDialogContent() {
        return <AddWantToLearnContent dictionary={dictionary} flashcardSet={flashcardSet} />
    }
}

export default AddWantToLearnModal


