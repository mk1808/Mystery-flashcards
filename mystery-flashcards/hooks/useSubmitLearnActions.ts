import useTrainingStore from "@/stores/useTrainingStore";
import { useEffect, useRef, useState } from "react";
import useSubmitTrainingResultAction from "./submitLearnActions/useSubmitTrainingResultAction";
import useSubmitTrainingAction from "./submitLearnActions/useSubmitTrainingAction";
import useSubmitTestAction from "./submitTrainingActions/useSubmitTestAction";
import useTestStore from "@/stores/useTestStore";
import useSubmitTestResultAction from "./submitTrainingActions/useSubmitTestResultAction";

function useSubmitLearnActions({ dictionary, locale }: { dictionary: any, locale: any }): { mainButtonAttrs: any, otherButtonAttrs: any } {
    const { view, flashcardSet } = useTrainingStore((state) => state);
    const { currentFlashcardIndex } = useTestStore((state) => state);
    const training = useSubmitTrainingAction({ dictionary, locale });
    const trainingResult = useSubmitTrainingResultAction({ dictionary, flashcardSet, locale });
    const test = useSubmitTestAction({ dictionary, locale });
    const testResult = useSubmitTestResultAction({ dictionary, locale });
    const [currentAction, setCurrentAction] = useState<{ mainButtonAttrs: ButtonAttrs, otherButtonAttrs: any }>({
        mainButtonAttrs: {
            title: "",
            type: "button"
        },
        otherButtonAttrs: ""
    });
    useEffect(() => {
        switch (view) {
            case "TRAINING":
                setCurrentAction(training)
                break;
            case "TRAINING_RESULT":
                setCurrentAction(trainingResult)
                break;
            case "TEST":
                setCurrentAction(test)
                break;
            case "TEST_RESULT":
                setCurrentAction(testResult)
                break;
        }
    }, [view, currentFlashcardIndex])

    return currentAction;
}

export default useSubmitLearnActions;