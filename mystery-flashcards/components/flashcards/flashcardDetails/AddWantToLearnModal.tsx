"use client"
import Modal from '@/components/common/Modal';
import React from 'react'
import AddWantToLearnActions from './AddWantToLearnActions';
import AddWantToLearnContent from './AddWantToLearnContent';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import { UserFlashcardT } from '@/models/UserFlashcard';
import useLocaleStore from '@/stores/useLocaleStore';
import { FlashcardSetT } from '@/models/FlashcardSet';

function AddWantToLearnModal({ flashcardSet, userFlashcard }: { flashcardSet: FlashcardSetT, userFlashcard: UserFlashcardT }) {
    const { dictionary } = useLocaleStore(state => state);

    return (
        <Modal
            modalTrigger={renderDialogTrigger()}
            dialogHeader={renderDialogHeader()}
            dialogContent={renderDialogContent()}
            dialogActions={renderDialogActions()}
            width="xl:w-5/12 sm:w-[600px]"
        />
    )

    function renderDialogTrigger() {
        return (
            <div className="tooltip tooltip-bottom" id="addWantToLearn" data-tip={dictionary.common.wantToLearnTitle}>
                <button className="btn btn-primary px-10 ml-2"> <FolderPlusIcon className="h-6 w-6" /> </button>
            </div>
        )
    }

    function renderDialogHeader() {
        return <h2 className="font-bold text-3xl">{dictionary.common.wantToLearnTitle}</h2>
    }

    function renderDialogContent() {
        return <AddWantToLearnContent flashcardSet={flashcardSet} />
    }

    function renderDialogActions() {
        return <AddWantToLearnActions flashcardSet={flashcardSet} userFlashcard={userFlashcard} />
    }
}

export default AddWantToLearnModal