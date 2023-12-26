import useTrainingStore from "@/stores/useTrainingStore";
import { useEffect, useState } from "react";
import useSubmitTrainingResultAction from "./submitTrainingActions/useSubmitTrainingResultAction";
import useSubmitTrainingAction from "./submitTrainingActions/useSubmitTrainingAction";
import useSubmitTestAction from "./submitTestActions/useSubmitTestAction";
import useTestStore from "@/stores/useTestStore";
import useSubmitTestResultAction from "./submitTestActions/useSubmitTestResultAction";
import useLocaleStore from "@/stores/useLocaleStore";
import { LearnViewOptions } from "@/enums/LearnViewOptions";

function useSubmitLearnActions(): MainAndOtherButton {
    const { dictionary } = useLocaleStore(state => state);
    const { view, flashcardSet } = useTrainingStore((state) => state);
    const { currentFlashcardIndex } = useTestStore((state) => state);

    const [currentAction, setCurrentAction] = useState<MainAndOtherButton>({
        mainButtonAttrs: {
            title: "",
            type: "button"
        },
        otherButtonAttrs: {
            title: "",
            type: undefined
        }
    });

    const training = useSubmitTrainingAction();
    const trainingResult = useSubmitTrainingResultAction({ flashcardSet });
    const test = useSubmitTestAction();
    const testResult = useSubmitTestResultAction();

    useEffect(() => {
        switch (view) {
            case LearnViewOptions.TRAINING:
                setCurrentAction(training)
                break;
            case LearnViewOptions.TRAINING_RESULT:
                setCurrentAction(trainingResult)
                break;
            case LearnViewOptions.TEST:
                setCurrentAction(test)
                break;
            case LearnViewOptions.TEST_RESULT:
                setCurrentAction(testResult)
                break;
        }
    }, [view, currentFlashcardIndex, dictionary])

    return currentAction;
}

export default useSubmitLearnActions;