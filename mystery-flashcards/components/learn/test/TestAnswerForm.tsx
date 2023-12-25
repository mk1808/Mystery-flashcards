"use client"
import { useForm } from 'react-hook-form';
import { isFieldValid } from '@/utils/client/FormUtils';
import MyInput from '@/components/common/form/MyInput';
import useTestStore from '@/stores/useTestStore';
import { AnswerT } from '@/models/Answer';
import useSubmitTestAction from '@/hooks/submitTrainingActions/useSubmitTestAction';

function TestAnswerForm({ dictionary, locale }: { dictionary: any, locale: string }) {
    const onAnswerSave = useTestStore((state) => state.onAnswerSave);
    const incrementCurrentFlashcardIndex = useTestStore((state) => state.incrementCurrentFlashcardIndex);
    const currentFlashcardIndex = useTestStore((state) => state.currentFlashcardIndex);
    const testFlashcards = useTestStore((state) => state.testFlashcards);
    const { otherButtonAttrs } = useSubmitTestAction({ dictionary, locale })

    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset
    } = useForm<AnswerForm>({ mode: 'onBlur' });

    const onSubmit = (answer: AnswerT) => {
        answer.flashcardId = testFlashcards[currentFlashcardIndex]._id;
        onAnswerSave(answer);

        if (currentFlashcardIndex < testFlashcards.length - 1) {
            incrementCurrentFlashcardIndex();
            reset({ givenAnswer: "" });
        } else {
            setTimeout(otherButtonAttrs.onFinishClick);
        }
    };
    const onErrors = (errors: any) => { };
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)} id="answerForm">
            <MyInput
                label={dictionary.common.answer}
                placeholder={dictionary.common.fillAnswer}
                inputParams={{ ...register("givenAnswer", { required: true }) }}
                isValid={isValid("givenAnswer")} />
        </form>
    )
}

export default TestAnswerForm