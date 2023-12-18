"use client"
import MyRadioInputButton from '@/components/common/form/MyRadioInputButton';
import { isFieldValid } from '@/utils/client/FormUtils';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

function StartLearningForm({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
    const label1 = `${flashcardSet.lang1} -> ${flashcardSet.lang2}`;
    const label2 = `${flashcardSet.lang2} -> ${flashcardSet.lang1}`;
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
        const path = data.type === "TEST" ? `/learn/test/${flashcardSet._id}` : `/learn/training/${flashcardSet._id}`;
        router.push(path)
        console.log(data);
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
                    value1={label1}
                    value2={label2}
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