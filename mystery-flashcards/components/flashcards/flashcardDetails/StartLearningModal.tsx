import Modal from '@/components/common/Modal'
import React from 'react'
import StartLearningActions from './StartLearningActions'
import StartLearningContent from './StartLearningContent'

function StartLearningModal({ dictionary, flashcardSet }: { dictionary: any, flashcardSet:any }) {
    return <Modal modalTrigger={renderDialogTrigger()}
        dialogHeader={renderDialogHeader()}
        dialogContent={renderDialogContent()}
        dialogActions={<StartLearningActions dictionary={dictionary} flashcardSet={flashcardSet} />}
        width="w-5/12"
    />

    function renderDialogTrigger() {
        return (
            <button className="btn btn-primary mr-10">{dictionary.common.learnThisFlashcardSet}</button>
        )
    }

    function renderDialogHeader() {
        return <h2 className="font-bold text-3xl">{dictionary.common.learnSetTitle}</h2>
    }

    function renderDialogContent() {
        return <StartLearningContent dictionary={dictionary} flashcardSet={flashcardSet} />
    }
}

export default StartLearningModal