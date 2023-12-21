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
    const { flashcardSet } = useTrainingStore((state) => state.flashcardSet);
    const setFinalResult = useTrainingStore((state) => state.setFinalResult);
    const addAlert = useAlertStore((state) => state.add)
    const router = useRouter();
    const wasCheckedRef = useRef<any>(null)
    wasCheckedRef.current = wasChecked;
    const mainButtonAttrs: ButtonAttrs = getMainButtonAttrs(wasCheckedRef.current);
    const flashcardSetRef = useRef<any>(null)
    flashcardSetRef.current = flashcardSet;
    const roundAnswersRef = useRef<any>(null)
    roundAnswersRef.current = roundAnswers;

    const goToResults = () => router.push(`/learn/training/${flashcardSetRef.current._id}/results`)
    const onFinishClick = async () => {
        try {
            const result = await patchAnswersAndReturnResults(flashcardSetRef.current._id, roundAnswersRef.current);
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