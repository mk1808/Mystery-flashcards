"use client"
import { useForm } from 'react-hook-form';
import { isFieldValid } from '@/utils/client/FormUtils';
import MyInput from '@/components/common/form/MyInput';
import useTrainingStore from '@/stores/useTrainingStore';
import { checkValidity, updateAnswer, updateResult } from '@/utils/client/TrainingUtils';
import { FlashcardT } from '@/models/Flashcard';
import { useRef } from 'react';
import { postAnswersAndReturnCards } from '@/utils/client/ApiUtils';

function AnswerForm({ dictionary, currentFlashcard, setIsValid, setWasChecked }: { dictionary: any, currentFlashcard: FlashcardT, setIsValid: any, setWasChecked: any }) {
    const { roundFlashcards, roundAnswers, direction, currentFlashcardIndexInRound, result, wasChecked, flashcardSet: { flashcardSet } } = useTrainingStore((state) => state);
    const { onAnswerSave, onNewRound, incrementCurrentFlashcardIndexInRound } = useTrainingStore((state) => state);
    const resultRef = useRef<any>(null);
    resultRef.current = result;


    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset,
        setFocus
    } = useForm<AnswerForm>({ mode: 'onBlur' });

    const onSubmit = async (answer: AnswerForm, e: any) => {
        try {
            console.log("answer", answer)
            console.log("TEST ANSWER")
            if (!wasChecked) {
                const currentFlashcard = roundFlashcards[currentFlashcardIndexInRound],
                    isValid = checkValidity(currentFlashcard, answer, direction),
                    updatedAnswer = updateAnswer(answer, currentFlashcard, isValid),
                    updatedResult = updateResult(updatedAnswer, resultRef.current);
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
                    console.log("ROUND: ", roundFlashcards)
                }
                setTimeout(() => setFocus("givenAnswer"), 10)
            }
        } catch (errorResponse: any) {

        }
    };
    const onErrors = (errors: any) => { };
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
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