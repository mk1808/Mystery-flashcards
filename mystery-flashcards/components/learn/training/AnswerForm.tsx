"use client"
import { useForm } from 'react-hook-form';
import { isFieldValid } from '@/utils/client/FormUtils';
import { AlertType } from '@/enums/AlertType';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { loginRequest } from '@/utils/client/ApiUtils';
import MyInput from '@/components/common/form/MyInput';
import useTrainingStore from '@/stores/useTrainingStore';
import { checkValidity, updateAnswer, updateResult } from '@/utils/client/TrainingUtils';
import { FlashcardT } from '@/models/Flashcard';

function AnswerForm({ dictionary,currentFlashcard, setIsValid, setWasChecked }: { dictionary: any, currentFlashcard:FlashcardT, setIsValid:any,setWasChecked:any  }) {
    const onAnswerSave = useTrainingStore((state) => state.onAnswerSave);
    const roundFlashcards = useTrainingStore((state) => state.roundFlashcards);
    const currentIndex = useTrainingStore((state) => state.currentFlashcardIndexInRound);
    const result = useTrainingStore((state) => state.result);


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
            console.log(answer)
            const currentFlashcard = roundFlashcards[currentIndex],
                updatedAnswer = updateAnswer(answer, currentFlashcard),
                updatedResult = updateResult(answer, result);
            onAnswerSave(updatedAnswer, currentFlashcard, updatedResult);
            setWasChecked(true);
            setIsValid(checkValidity(currentFlashcard, answer))

        } catch (errorResponse: any) {

        }
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <MyInput
                label={dictionary.common.answer}
                placeholder={dictionary.common.fillAnswer}
                inputParams={{ ...register("givenAnswer", { required: true }) }}
                isValid={isValid("givenAnswer")} />
            <button type="submit" className="btn btn-primary mb-3 btn-wide">{dictionary.common.login}</button>
        </form>
    )
}

export default AnswerForm