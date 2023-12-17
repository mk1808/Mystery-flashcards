import Modal from '@/components/common/Modal'
import React from 'react'

function StartLearningModal({ dictionary, flashcardSet }: { dictionary: any, flashcardSet:any }) {
    return <Modal modalTrigger={renderDialogTrigger()}
        dialogHeader={renderDialogHeader()}
        dialogContent={renderDialogContent()}
        dialogActions={renderModalActions()}
    />

    function renderDialogTrigger() {
        return (
            <button className="btn btn-primary mr-10">{dictionary.common.learnThisFlashcardSet}</button>
        )
    }

    function renderDialogHeader() {
        return <h2 className="font-bold text-3xl">{dictionary.common.learnSetTitle}</h2>
    }

    function renderModalActions() {
        return (
            <>
                <button className="btn ml-3">Close</button>
                <button className="btn btn-primary ml-3"> Confirm</button>
            </>
        )
    }

    function renderDialogContent() {

        return <>content</>
    }
}

export default StartLearningModal