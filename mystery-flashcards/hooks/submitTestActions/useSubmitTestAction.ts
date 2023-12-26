import { AlertType } from '@/enums/AlertType';
import { TestResultT } from '@/models/TestResult';
import useAlertStore from '@/stores/useAlertStore';
import useLocaleStore from '@/stores/useLocaleStore';
import useTestStore from '@/stores/useTestStore';
import useTrainingStore from '@/stores/useTrainingStore';
import { sendTestAnswersRequest } from '@/utils/client/ApiUtils';
import { getMainButtonAttrs } from '@/utils/client/TrainingUtils';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

function useSubmitTestAction(): MainAndOtherButton {
    const { dictionary, locale } = useLocaleStore(state => state);
    const { testAnswers, currentFlashcardIndex, testFlashcards, direction, flashcardSet: { flashcardSet } } = useTestStore((state) => state);
    const { setFinalResult } = useTrainingStore((state) => state);
    const addAlert = useAlertStore((state) => state.add)
    const router = useRouter();

    const flashcardSetRef = useRef<any>(null)
    flashcardSetRef.current = flashcardSet;
    const testAnswersRef = useRef<any>(null)
    testAnswersRef.current = testAnswers;

    const mainTitle = currentFlashcardIndex < testFlashcards.length - 1 ? dictionary.common.continue : dictionary.common.endTest;
    const goToResults = () => router.push(`/${locale}/learn/test/${flashcardSetRef.current._id}/results`)
    const onFinishClick = async () => {
        try {
            const testResult: TestResultT = {
                direction,
                answers: testAnswersRef.current
            }
            const result = await sendTestAnswersRequest(flashcardSetRef.current._id, testResult);
            setFinalResult(result);
            goToResults();
        } catch (errorResponse: any) {
            addAlert({ type: AlertType.error, title: getNestedFieldByPath(dictionary, errorResponse.body.message) })
        }
    }

    const mainButtonAttrs: ButtonAttrs = {
        ...getMainButtonAttrs(false, dictionary),
        title: mainTitle
    }

    const otherButtonAttrs: ButtonAttrs = {
        title: dictionary.common.endLearning,
        onClick: onFinishClick
    }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTestAction