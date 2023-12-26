import { UserRanges } from "@/enums/UserRang";
import Modal from "../common/Modal"
import Steps, { Step } from "../common/Steps"
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { getNestedFieldByPath } from "@/utils/server/objectUtils";
import useLocaleStore from "@/stores/useLocaleStore";

function UserRangesModal() {
    const { dictionary } = useLocaleStore(state => state);

    const getRanges = (): Step[] => UserRanges.map(rang => (
        {
            title: getNestedFieldByPath(dictionary, rang.name),
            description: rang.pointsFrom
        }
    ));

    return <Modal modalTrigger={renderDialogTrigger()}
        dialogHeader={renderDialogHeader()}
        dialogContent={renderModalContent()}
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

    function renderModalContent() {
        return (
            <>
                <div className='my-3 text-left font-light text-lg'>{dictionary.common.levelsInfo}</div>
                <Steps steps={getRanges()} />
            </>
        )
    }

    function renderModalActions() {
        return (
            <button className="btn">{dictionary.common.close}</button>
        )
    }
}

export default UserRangesModal