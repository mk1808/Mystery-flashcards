"use client"
import { isFieldValid } from '@/utils/client/FormUtils';
import { useRouter } from 'next/navigation';
import React from 'react'
import MyInput from '../common/form/MyInput';
import { useForm } from 'react-hook-form';

function NewFlashcardForm({ dictionary }: { dictionary: any }) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset
    } = useForm<NewFlashcardSetForm>({ mode: 'onBlur' });

    const onSubmit = async (data: NewFlashcardSetForm, e: any) => {
       // const response = await login(data);
        reset();
        router.push('/user')        
        console.log(data);
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);

    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <div>

                <MyInput
                    label={dictionary.common.basicName}
                    placeholder={dictionary.common.fillBasicName}
                    inputParams={{ ...register("name", { required: true }) }}
                    isValid={isValid("name")} />

            </div>
        </form>
    )
}

export default NewFlashcardForm