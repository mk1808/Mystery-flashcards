"use client"
import { useForm } from 'react-hook-form';
import { isFieldValid } from '@/utils/client/FormUtils';
import MyInput from '@/components/common/form/MyInput';
import useTestStore from '@/stores/useTestStore';
import { AnswerT } from '@/models/Answer';
import useSubmitTestAction from '@/hooks/submitTestActions/useSubmitTestAction';
import useLocaleStore from '@/stores/useLocaleStore';

function TestAnswerForm() {
    const { dictionary } = useLocaleStore(state => state);
    const { currentFlashcardIndex, testFlashcards } = useTestStore((state) => state);
    const { onAnswerSave, incrementCurrentFlashcardIndex } = useTestStore((state) => state);
    const { otherButtonAttrs } = useSubmitTestAction()

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
            setTimeout(otherButtonAttrs.onClick);
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