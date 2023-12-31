"use client"
import { useForm } from 'react-hook-form';
import { isFieldValid } from '@/utils/client/FormUtils';
import MyInput from '@/components/common/form/MyInput';
import useTrainingStore from '@/stores/useTrainingStore';
import { checkValidity, getUpdatedAnswerInfo, updateAnswer, updateResult } from '@/utils/client/TrainingUtils';
import { useRef } from 'react';
import { postAnswersAndReturnCards } from '@/utils/client/ApiUtils';
import useLocaleStore from '@/stores/useLocaleStore';

function AnswerForm({ setIsValid, setWasChecked }: { setIsValid: (value: boolean) => any, setWasChecked: (value: boolean) => any }) {
    const { dictionary } = useLocaleStore(state => state);
    const { roundFlashcards, roundAnswers, direction, currentFlashcardIndexInRound, result, wasChecked, flashcardSet: { flashcardSet } } = useTrainingStore((state) => state);
    const { onAnswerSave, onNewRound, incrementCurrentFlashcardIndexInRound } = useTrainingStore((state) => state);
    const resultRef = useRef<any>(null);
    resultRef.current = result;

    const {
        register,
        handleSubmit,
        getFieldState,
        formState,
        reset,
        setFocus
    } = useForm<AnswerForm>({ mode: 'onBlur' });

    const onSubmit = async (answer: AnswerForm, e: any) => {
        try {
            if (!wasChecked) {
                const currentFlashcard = roundFlashcards[currentFlashcardIndexInRound],
                    { isValid, updatedAnswer, updatedResult } = getUpdatedAnswerInfo(currentFlashcard, answer, direction, resultRef.current);
                onAnswerSave(updatedAnswer, currentFlashcard, updatedResult);
                setWasChecked(true);
                setIsValid(isValid);
            } else {
                setWasChecked(false);
                reset({ givenAnswer: "" })
                const hasNextFlashcard = currentFlashcardIndexInRound + 1 < roundFlashcards.length;
                if (hasNextFlashcard) {
                    incrementCurrentFlashcardIndexInRound();
                }
                else {
                    const roundFlashcards = await postAnswersAndReturnCards(flashcardSet?._id, roundAnswers);
                    onNewRound(roundFlashcards);
                }
                setTimeout(() => setFocus("givenAnswer"), 10)
            }
        } catch (errorResponse: any) { }
    };
    const onErrors = (errors: any) => { };
    const isValid = (name: string) => isFieldValid(name, formState);
    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)} id="answerForm">
            <MyInput
                label={dictionary.common.answer}
                placeholder={dictionary.common.fillAnswer}
                inputParams={{ ...register("givenAnswer", { required: true, disabled: wasChecked }) }}
                isValid={isValid("givenAnswer")} />
        </form>
    )
}

export default AnswerForm