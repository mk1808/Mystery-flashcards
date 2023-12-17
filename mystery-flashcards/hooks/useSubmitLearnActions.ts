import useTrainingStore from "@/stores/useTrainingStore";
import { useEffect, useRef, useState } from "react";
import useSubmitTrainingResultAction from "./submitLearnActions/useSubmitTrainingResultAction";
import useSubmitTrainingAction from "./submitLearnActions/useSubmitTrainingAction";

function useSubmitLearnActions({ dictionary }: { dictionary: any }): { mainButtonAttrs: any, otherButtonAttrs: any } {
    const view = useTrainingStore((state) => state.view);
    const training = useSubmitTrainingAction({ dictionary });
    const trainingResult = useSubmitTrainingResultAction({ dictionary });
    const [currentAction,setCurrentAction] = useState<{mainButtonAttrs:ButtonAttrs, otherButtonAttrs:any}>({
        mainButtonAttrs: {
            title: "",
            type: "button"
        },
        otherButtonAttrs: ""
    });
    useEffect(() => {
        debugger
        switch (view) {
            case "TRAINING":
                setCurrentAction(training)
                break;
            case "TRAINING_RESULT":
                setCurrentAction(trainingResult)
                break;
        }
    }, [view])

    return currentAction;
}

export default useSubmitLearnActions;