import { AlertType } from '@/enums/AlertType';
import useAlertStore from '@/stores/useAlertStore';
import useTestStore from '@/stores/useTestStore';
import useTrainingStore from '@/stores/useTrainingStore';
import { sendTestAnswersRequest } from '@/utils/client/ApiUtils';
import { getMainButtonAttrs } from '@/utils/client/TrainingUtils';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { useRouter } from 'next/navigation';

function useSubmitTestAction({ dictionary }: { dictionary: any }) {
    const testAnswers = useTestStore((state) => state.testAnswers);
    const currentFlashcardIndex = useTestStore((state) => state.currentFlashcardIndex);
    const testFlashcards = useTestStore((state) => state.testFlashcards);
    const setFinalResult = useTrainingStore((state) => state.setFinalResult);
    const addAlert = useAlertStore((state) => state.add)
    const router = useRouter();
    const tempId = "656b7e961c783fdd82116774";

    const mainButtonAttrs: ButtonAttrs = getMainButtonAttrs(false);
    console.log("currentFlashcardIndex < testFlashcards.length - 1", currentFlashcardIndex < testFlashcards.length - 1)
    mainButtonAttrs.title = currentFlashcardIndex < testFlashcards.length - 1 ? "Kontynuuj" : "Zakończ test";

    const goToResults = () => router.push(`/learn/test/${tempId}/results`)
    const onFinishClick = async () => {
        try {
            const result = await sendTestAnswersRequest(tempId, testAnswers);
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