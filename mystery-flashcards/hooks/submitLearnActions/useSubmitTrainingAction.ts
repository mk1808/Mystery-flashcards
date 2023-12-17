import { AlertType } from '@/enums/AlertType';
import useAlertStore from '@/stores/useAlertStore';
import useTrainingStore from '@/stores/useTrainingStore';
import { patchAnswersAndReturnResults } from '@/utils/client/ApiUtils';
import { getMainButtonAttrs } from '@/utils/client/TrainingUtils';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'

function useSubmitTrainingAction({ dictionary }: { dictionary: any }) {
    const wasChecked = useTrainingStore((state) => state.wasChecked);
    const roundAnswers = useTrainingStore((state) => state.roundAnswers);
    const setFinalResult = useTrainingStore((state) => state.setFinalResult);
    const addAlert = useAlertStore((state) => state.add)
    const router = useRouter();
    const wasCheckedRef = useRef<any>(null)
    wasCheckedRef.current = wasChecked;
    const tempId = "656a2c5d573e1d09a12fd05a";
    const mainButtonAttrs: ButtonAttrs = getMainButtonAttrs(wasCheckedRef.current);
    const goToResults = () => router.push(`/learn/training/${tempId}/results`)
    const onFinishClick = async () => {
        try {
            const result = await patchAnswersAndReturnResults(tempId, roundAnswers);
            setFinalResult(result);
            goToResults();
        } catch (errorResponse: any) {
            addAlert({ type: AlertType.error, title: getNestedFieldByPath(dictionary, errorResponse.body.message) })
        }

    }
    const otherButtonAttrs = { onFinishClick, title: "Zakończ naukę" }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTrainingAction