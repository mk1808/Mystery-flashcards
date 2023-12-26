"use client"
import Modal from '@/components/common/Modal'
import React from 'react'
import StartLearningActions from './StartLearningActions'
import StartLearningContent from './StartLearningContent'
import useLocaleStore from '@/stores/useLocaleStore';

function StartLearningModal({ flashcardSet, dialogTriggerClassName = "" }: { flashcardSet: any, dialogTriggerClassName?: string }) {
    const { dictionary } = useLocaleStore(state => state);
    return <Modal modalTrigger={renderDialogTrigger()}
        dialogHeader={renderDialogHeader()}
        dialogContent={renderDialogContent()}
        dialogActions={<StartLearningActions />}
        width="xl:w-5/12 sm:w-[600px]"
    />

    function renderDialogTrigger() {
        return <button className={`btn btn-primary mr-2 md:mr-10 ${dialogTriggerClassName}`} id="modalButton">{dictionary.common.learnThisFlashcardSet}</button>;
    }

    function renderDialogHeader() {
        return <h2 className="font-bold text-3xl">{dictionary.common.learnSetTitle}</h2>
    }

    function renderDialogContent() {
        return <StartLearningContent flashcardSet={flashcardSet} />
    }
}

export default StartLearningModal