"use client"
import MyRadioInputButton from '@/components/common/form/MyRadioInputButton';
import { isFieldValid } from '@/utils/client/FormUtils';
import { createPathParams } from '@/utils/client/RestUtils';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

function StartLearningForm({ dictionary, flashcardSet, locale }: { dictionary: any, flashcardSet: any, locale: string }) {
    const label1 = `${flashcardSet.lang1} -> ${flashcardSet.lang2}`;
    const label2 = `${flashcardSet.lang2} -> ${flashcardSet.lang1}`;
    const direction = { main: "main", reversed: "reversed" }
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset
    } = useForm<ChooseLearnTypeForm>({ mode: 'onBlur' });

    const onSubmit = async (data: ChooseLearnTypeForm, e: any) => {
        const path = data.type === "TEST" ? `/${locale}/learn/test/${flashcardSet._id}` : `/${locale}/learn/training/${flashcardSet._id}`;
        router.push(path + `?${createPathParams({ direction: data.direction })}`)
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);

    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)} id="chooseLearnTypeForm">
            <div className='flex flex-col justify-around items-center'>
                <MyRadioInputButton
                    option1Label={dictionary.common.learnTypeTraining}
                    option2Label={dictionary.common.learnTypeTest}
                    value1="TRAINING"
                    value2="TEST"
                    inputParams={{ ...register("type", { required: true }) }}
                    isValid={isValid("type")}
                    size="w-48 h-16"
                    className='items-center'
                />
                <MyRadioInputButton
                    option1Label={label1}
                    option2Label={label2}
                    value1={direction.main}
                    value2={direction.reversed}
                    inputParams={{ ...register("direction", { required: true }) }}
                    isValid={isValid("direction")}
                    size="w-48 h-16"
                    className='items-center'
                />
            </div>
        </form>
    )
}

export default StartLearningForm