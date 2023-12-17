import Modal from '@/components/common/Modal'
import React from 'react'

function StartLearningModal({ dictionary }: { dictionary: any }) {
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
        return <h2 className="font-bold text-3xl">{dictionary.common.availableLevels}</h2>
    }

    function renderModalActions() {
        return (
            <>
                <button className="btn">Close</button>
            </>
        )
    }

    function renderDialogContent() {

        return <>content</>
    }
}

export default StartLearningModal