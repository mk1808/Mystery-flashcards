"use client"
import MyRadioInputButton from '@/components/common/form/MyRadioInputButton';
import { DirectionOptions } from '@/enums/DirectionOptions';
import { FlashcardSetT } from '@/models/FlashcardSet';
import useLocaleStore from '@/stores/useLocaleStore';
import { isFieldValid } from '@/utils/client/FormUtils';
import { createPathParams } from '@/utils/client/RestUtils';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

function StartLearningForm({ flashcardSet }: { flashcardSet: FlashcardSetT }) {
    const { dictionary, locale } = useLocaleStore(state => state);
    const router = useRouter();

    const label1 = `${flashcardSet.lang1} -> ${flashcardSet.lang2}`;
    const label2 = `${flashcardSet.lang2} -> ${flashcardSet.lang1}`;
    const {
        register,
        handleSubmit,
        getFieldState,
        formState
    } = useForm<ChooseLearnTypeForm>({ mode: 'onBlur' });

    const onSubmit = async (data: ChooseLearnTypeForm, e: any) => {
        const path = data.type === "TEST" ? `/${locale}/learn/test/${flashcardSet._id}` : `/${locale}/learn/training/${flashcardSet._id}`;
        router.push(path + `?${createPathParams({ direction: data.direction })}`)
    };
    const onErrors = (errors: any) => { };
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
                />
                <MyRadioInputButton
                    option1Label={label1}
                    option2Label={label2}
                    value1={DirectionOptions.MAIN}
                    value2={DirectionOptions.REVERSED}
                    inputParams={{ ...register("direction", { required: true }) }}
                    isValid={isValid("direction")}
                />
            </div>
        </form>
    )
}

export default StartLearningForm