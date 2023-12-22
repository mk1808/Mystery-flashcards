import useTrainingStore from "@/stores/useTrainingStore";
import { useEffect, useRef, useState } from "react";
import useSubmitTrainingResultAction from "./submitLearnActions/useSubmitTrainingResultAction";
import useSubmitTrainingAction from "./submitLearnActions/useSubmitTrainingAction";
import useSubmitTestAction from "./submitTrainingActions/useSubmitTestAction";
import useTestStore from "@/stores/useTestStore";
import useSubmitTestResultAction from "./submitTrainingActions/useSubmitTestResultAction";

function useSubmitLearnActions({ dictionary }: { dictionary: any }): { mainButtonAttrs: any, otherButtonAttrs: any } {
    const view = useTrainingStore((state) => state.view);
    const flashcardSet = useTrainingStore((state) => state.flashcardSet);
    const currentFlashcardIndex = useTestStore((state) => state.currentFlashcardIndex);
    const training = useSubmitTrainingAction({ dictionary });
    const trainingResult = useSubmitTrainingResultAction({ dictionary, flashcardSet });
    const test = useSubmitTestAction({ dictionary });
    const testResult = useSubmitTestResultAction({ dictionary, flashcardSet });
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