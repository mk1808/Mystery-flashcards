import { AlertType } from '@/enums/AlertType';
import useAlertStore from '@/stores/useAlertStore';
import useTrainingStore from '@/stores/useTrainingStore';
import { patchAnswersAndReturnResults } from '@/utils/client/ApiUtils';
import { getMainButtonAttrs } from '@/utils/client/TrainingUtils';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'

function useSubmitTrainingAction({ dictionary, locale }: { dictionary: any, locale: string }) {
    const { wasChecked, roundAnswers, flashcardSet: { flashcardSet } } = useTrainingStore((state) => state);
    const { setFinalResult } = useTrainingStore((state) => state);
    const addAlert = useAlertStore((state) => state.add)
    const router = useRouter();
    const wasCheckedRef = useRef<any>(null)
    wasCheckedRef.current = wasChecked;
    const mainButtonAttrs: ButtonAttrs = getMainButtonAttrs(wasCheckedRef.current, dictionary);
    const flashcardSetRef = useRef<any>(null)
    flashcardSetRef.current = flashcardSet;
    const roundAnswersRef = useRef<any>(null)
    roundAnswersRef.current = roundAnswers;

    const goToResults = () => router.push(`/${locale}/learn/training/${flashcardSetRef.current._id}/results`)
    const onFinishClick = async () => {
        try {
            const result = await patchAnswersAndReturnResults(flashcardSetRef.current._id, roundAnswersRef.current);
            setFinalResult(result);
            goToResults();
        } catch (errorResponse: any) {
            addAlert({ type: AlertType.error, title: getNestedFieldByPath(dictionary, errorResponse.body.message) })
        }

    }
    const otherButtonAttrs = { onFinishClick, title: dictionary.common.endLearning }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTrainingAction