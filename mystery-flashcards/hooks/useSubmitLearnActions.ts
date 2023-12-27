import useTrainingStore from "@/stores/useTrainingStore";
import useSubmitTrainingResultAction from "./submitTrainingActions/useSubmitTrainingResultAction";
import useSubmitTrainingAction from "./submitTrainingActions/useSubmitTrainingAction";
import useSubmitTestAction from "./submitTestActions/useSubmitTestAction";
import useSubmitTestResultAction from "./submitTestActions/useSubmitTestResultAction";
import { LearnViewOptions } from "@/enums/LearnViewOptions";

function useSubmitLearnActions(): MainAndOtherButton {
    const { view, flashcardSet } = useTrainingStore((state) => state);

    const training = useSubmitTrainingAction();
    const trainingResult = useSubmitTrainingResultAction({ flashcardSet });
    const test = useSubmitTestAction();
    const testResult = useSubmitTestResultAction();

    switch (view) {
        case LearnViewOptions.TRAINING:
            return training
        case LearnViewOptions.TRAINING_RESULT:
            return trainingResult
        case LearnViewOptions.TEST:
            return test
        case LearnViewOptions.TEST_RESULT:
            return testResult
    }
}

export default useSubmitLearnActions;