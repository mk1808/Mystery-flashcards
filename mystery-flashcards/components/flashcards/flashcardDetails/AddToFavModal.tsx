import Modal from '@/components/common/Modal'
import React from 'react'
import { HeartIcon } from "@heroicons/react/24/outline"

function AddToFavModal({ dictionary }: { dictionary: any }) {
    return <Modal modalTrigger={renderDialogTrigger()}
        dialogHeader={renderDialogHeader()}
        dialogContent={renderDialogContent()}
        dialogActions={renderModalActions()}
    />

    function renderDialogTrigger() {
        return (
            <div className="tooltip tooltip-bottom" data-tip={dictionary.common.addToFavorites}>
                <button className="btn btn-primary"> &nbsp;<HeartIcon className="h-6 w-6" /> &nbsp; </button>
            </div>
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

export default AddToFavModal