import Modal from '@/components/common/Modal'
import React from 'react'
import StartLearningActions from './StartLearningActions'
import StartLearningContent from './StartLearningContent'

function StartLearningModal({ dictionary, flashcardSet, locale, dialogTriggerClassName = "" }: { dictionary: any, flashcardSet: any, locale: string, dialogTriggerClassName?: string }) {
    return <Modal modalTrigger={renderDialogTrigger()}
        dialogHeader={renderDialogHeader()}
        dialogContent={renderDialogContent()}
        dialogActions={<StartLearningActions dictionary={dictionary} flashcardSet={flashcardSet} />}
        width="xl:w-5/12 w-[600px]"
    />

    function renderDialogTrigger() {
        return (
            <button className={`btn btn-primary mr-10 ${dialogTriggerClassName}`} id="modalButton">{dictionary.common.learnThisFlashcardSet}</button>
        )
    }

    function renderDialogHeader() {
        return <h2 className="font-bold text-3xl">{dictionary.common.learnSetTitle}</h2>
    }

    function renderDialogContent() {
        return <StartLearningContent dictionary={dictionary} flashcardSet={flashcardSet} locale={locale} />
    }
}

export default StartLearningModal