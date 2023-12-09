"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import FlashcardContainer from '../common/FlashcardContainer'
import { useRouter } from 'next/navigation';
import { isFieldValid } from '@/utils/client/FormUtils';
import MyInput from '../common/form/MyInput';
import MyTextarea from '../common/form/MyTextarea';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';

function NewFlashcardListForm({ dictionary, flashcards }: { dictionary: any, flashcards: any }) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset
    } = useForm<any>({ mode: 'onBlur' });
    const onSubmit = async (data: LoginForm, e: any) => {
        //const response = await login(data);
        reset();
        router.push('/user')
        console.log(data);
        //console.log(response);
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
    const flashcardsList = useNewFlashcardSetStore((state) => state.flashcardsList)
    const addFlashcard = useNewFlashcardSetStore((state) => state.addFlashcard)
    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            {flashcardsList.map((card: any) =>
                <FlashcardContainer
                    key={card.wordLang1}
                    card={card}
                    renderInput={renderInput}
                    renderTextarea={renderTextarea}
                    onDelete={onDelete} />
            )}
       <button type="button" className="btn btn-secondary btn-outline bg-base-100 mr-10" onClick={addFlashcard}>zmien</button>
        </form>
    )
//{firstName}
//      <button className="btn btn-secondary btn-outline bg-base-100 mr-10" onClick={() => updateFirstName("newV")}>zmien</button>
           
    function renderInput() {
        return (
            <MyInput
                label={dictionary.common.name}
                placeholder={dictionary.common.fillName}
                inputParams={{ ...register("name", { required: true }) }}
                isValid={isValid("name")} />
        )
    }

    function renderTextarea() {
        return (
            <MyTextarea
                label={dictionary.common.name}
                placeholder={dictionary.common.fillName}
                inputParams={{ ...register("name", { required: true }) }}
                isValid={isValid("name")} />
        )
    }

    function onDelete() {
        console.log("onDelete")
    }
}

export default NewFlashcardListForm