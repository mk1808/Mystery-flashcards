import { AlertType } from '@/enums/AlertType';
import useAlertStore from '@/stores/useAlertStore';
import useTestStore from '@/stores/useTestStore';
import useTrainingStore from '@/stores/useTrainingStore';
import { sendTestAnswersRequest } from '@/utils/client/ApiUtils';
import { getMainButtonAttrs } from '@/utils/client/TrainingUtils';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

function useSubmitTestAction({ dictionary }: { dictionary: any }) {
    const testAnswers = useTestStore((state) => state.testAnswers);
    const currentFlashcardIndex = useTestStore((state) => state.currentFlashcardIndex);
    const testFlashcards = useTestStore((state) => state.testFlashcards);
    const { flashcardSet } = useTestStore((state) => state.flashcardSet);
    const setFinalResult = useTrainingStore((state) => state.setFinalResult);
    const addAlert = useAlertStore((state) => state.add)
    const router = useRouter();

    const mainButtonAttrs: ButtonAttrs = getMainButtonAttrs(false);
    console.log("currentFlashcardIndex < testFlashcards.length - 1", currentFlashcardIndex < testFlashcards.length - 1)
    mainButtonAttrs.title = currentFlashcardIndex < testFlashcards.length - 1 ? "Kontynuuj" : "Zakończ test";
    const flashcardSetRef = useRef<any>(null)
    flashcardSetRef.current = flashcardSet;
    const testAnswersRef = useRef<any>(null)
    testAnswersRef.current = testAnswers;

    const goToResults = () => router.push(`/learn/test/${flashcardSetRef.current._id}/results`)
    const onFinishClick = async () => {
        try {
            const result = await sendTestAnswersRequest(flashcardSetRef.current._id, testAnswersRef.current);
            setFinalResult(result);
            goToResults();
        } catch (errorResponse: any) {
            addAlert({ type: AlertType.error, title: getNestedFieldByPath(dictionary, errorResponse.body.message) })
        }
    }
    const otherButtonAttrs = { onFinishClick, title: "Zakończ naukę" }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTestAction