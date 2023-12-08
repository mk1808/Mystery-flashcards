import { UserRanges } from "@/enums/UserRang";
import Modal from "../common/Modal"
import Steps, { Step } from "../common/Steps"
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { use } from "react";
import { getDictionary } from "@/dictionaries/dictionaries";

export default function UserRangesModal({ locale }: { locale: string }) {
    const dictionary = use(getDictionary(locale));

    function getRanges(): Step[] {
        return UserRanges.map(rang => ({ title: rang.name, description: rang.pointsFrom }));
    }
    return <Modal modalTrigger={renderDialogTrigger()}
        dialogHeader={renderDialogHeader()}
        dialogContent={<Steps steps={getRanges()} />}
        dialogActions={renderModalActions()}
    />

    function renderDialogTrigger() {
        return (
            <div className="tooltip tooltip-right" data-tip={dictionary.common.availableLevels}>
                <InformationCircleIcon className="h-6 w-6 ml-2 text-secondary cursor-pointer" />
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
}