"use client"
import MyRadioInputButton from '@/components/common/form/MyRadioInputButton';
import { isFieldValid } from '@/utils/client/FormUtils';
import React from 'react'
import { useForm } from 'react-hook-form';

function StartLearningForm({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
    const label1 = `${flashcardSet.lang1} -> ${flashcardSet.lang2}`;
    const label2 = `${flashcardSet.lang2} -> ${flashcardSet.lang1}`;
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset
    } = useForm<ChooseLearnTypeForm>({ mode: 'onBlur' });

    const onSubmit = async (data: ChooseLearnTypeForm, e: any) => {
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
                    inputParams={{ ...register("type", { required: true }) }}
                    isValid={isValid("type")}
                    size="w-48 h-16"
                    className='items-center'
                />
                <MyRadioInputButton
                    option1Label={label1}
                    option2Label={label2}
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