"use client"
import { useForm } from 'react-hook-form';
import { isFieldValid } from '@/utils/client/FormUtils';
import MyInput from '@/components/common/form/MyInput';
import useTrainingStore from '@/stores/useTrainingStore';
import { checkValidity, updateAnswer, updateResult } from '@/utils/client/TrainingUtils';
import { FlashcardT } from '@/models/Flashcard';
import { useRef } from 'react';

function AnswerForm({ dictionary, currentFlashcard, setIsValid, setWasChecked }: { dictionary: any, currentFlashcard: FlashcardT, setIsValid: any, setWasChecked: any }) {
    const onAnswerSave = useTrainingStore((state) => state.onAnswerSave);
    const roundFlashcards = useTrainingStore((state) => state.roundFlashcards);
    const currentIndex = useTrainingStore((state) => state.currentFlashcardIndexInRound);
    const result = useTrainingStore((state) => state.result);
    const wasChecked = useTrainingStore((state) => state.wasChecked);
    const incrementCurrentFlashcardIndexInRound = useTrainingStore((state) => state.incrementCurrentFlashcardIndexInRound);
    const resultRef = useRef<any>(null);
    resultRef.current = result;

    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset
    } = useForm<AnswerForm>({ mode: 'onBlur' });

    const onSubmit = async (answer: AnswerForm, e: any) => {
        try {
            console.log("answer", answer)
            console.log("TEST ANSWER")
            if (!wasChecked) {
                const currentFlashcard = roundFlashcards[currentIndex],
                    isValid = checkValidity(currentFlashcard, answer),
                    updatedAnswer = updateAnswer(answer, currentFlashcard, isValid),
                    updatedResult = updateResult(updatedAnswer, resultRef.current);
                onAnswerSave(updatedAnswer, currentFlashcard, updatedResult);
                setWasChecked(true);
                setIsValid(isValid);
            }

            else {
                incrementCurrentFlashcardIndexInRound();
                setWasChecked(false);
                reset({ givenAnswer: "" })
            }




        } catch (errorResponse: any) {

        }
    };
    const onErrors = (errors: any) => console.error(errors);
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

export default AnswerForm