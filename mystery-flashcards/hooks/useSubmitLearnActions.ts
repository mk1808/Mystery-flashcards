import useTrainingStore from "@/stores/useTrainingStore";
import { useEffect, useRef, useState } from "react";
import useSubmitTrainingResultAction from "./submitLearnActions/useSubmitTrainingResultAction";
import useSubmitTrainingAction from "./submitLearnActions/useSubmitTrainingAction";
import useSubmitTestAction from "./submitTrainingActions/useSubmitTestAction";
import useTestStore from "@/stores/useTestStore";

function useSubmitLearnActions({ dictionary }: { dictionary: any }): { mainButtonAttrs: any, otherButtonAttrs: any } {
    const view = useTrainingStore((state) => state.view);
    const currentFlashcardIndex = useTestStore((state) => state.currentFlashcardIndex);
    const training = useSubmitTrainingAction({ dictionary });
    const trainingResult = useSubmitTrainingResultAction({ dictionary });
    const test = useSubmitTestAction({ dictionary });
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
        }
    }, [view, currentFlashcardIndex])

    return currentAction;
}

export default useSubmitLearnActions;