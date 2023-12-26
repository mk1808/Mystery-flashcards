"use client"
import { FlashcardT } from '@/models/Flashcard'
import React, { useEffect, useRef } from 'react'
import { TrashIcon } from "@heroicons/react/24/outline";
import { useForm } from 'react-hook-form';
import MyInput from './form/MyInput';
import MyTextarea from './form/MyTextarea';
import { isFieldValid } from '@/utils/client/FormUtils';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';
import useLocaleStore from '@/stores/useLocaleStore';

function FlashcardContainer({
    card,
    isForm = false
}: {
    card: FlashcardT,
    isForm?: boolean
}) {
    const { dictionary } = useLocaleStore(state => state);
    const { flashcardsList } = useNewFlashcardSetStore((state) => state)
    const { updateFlashcard, addNewFlashcard, deleteFlashcard, flashcardListInvalidCountInc, flashcardListInvalidCountDec } = useNewFlashcardSetStore((state) => state);
    const allFlashCards = useRef(flashcardsList)
    const lastValidationState = useRef(true)
    const getDefaultValues = () => card || {};

    useEffect(() => {
        allFlashCards.current = flashcardsList
    }, [flashcardsList])

    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
    } = useForm<FlashcardsForm>({ mode: 'onBlur', defaultValues: getDefaultValues() });

    useEffect(() => {
        const subscription = watch(watchForm)
        return () => subscription.unsubscribe()
    }, [watch])

    useEffect(onFormStateChange, [formState])

    const onSubmit = (data: FlashcardsForm) => console.log(data);
    const onErrors = (errors: any) => { };
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
    const isDirty = () => Object.keys(formState.dirtyFields).length > 0
    const showDelete = () => (isDirty() || formState.defaultValues?.wordLang1) && flashcardsList.length > 1;

    function watchForm(value: FlashcardsForm) {
        updateFlashcard({ ...card, ...value })
        const lastFlashcard = allFlashCards.current[allFlashCards.current.length - 1],
            isLast = lastFlashcard._id === card._id;
        if (isLast) {
            addNewFlashcard();
        }
    }

    function onFormStateChange() {
        const isDirty = Object.keys(formState.dirtyFields).length > 0
        if (isDirty && lastValidationState.current != formState.isValid) {
            if (formState.isValid) {
                flashcardListInvalidCountDec()
            } else {
                flashcardListInvalidCountInc()
            }
            lastValidationState.current = formState.isValid
        }
    }

    function onDelete() {
        if (!formState.isValid) {
            flashcardListInvalidCountDec()
        }
        deleteFlashcard(card as FlashcardsForm);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <div className="card w-full bg-base-100 shadow-xl mb-10">
                <div className="card-body">
                    {renderCardBody()}
                </div>
            </div>
        </form>
    )

    function renderCardBody() {
        return (
            <>
                <div className="flex flex-col sm:flex-row justify-around min-h-[107px] items-center">
                    <div className="w-full justify-end">
                        {renderLeftSide()}
                    </div>
                    <div className="divider sm:divider-horizontal" />
                    <div className="w-full">
                        {renderRightSide()}
                    </div>
                </div>
                {renderDeleteIcon()}
            </>
        )
    }

    function renderLeftSide() {
        if (isForm) {
            return renderInputs("wordLang1", "wordBasicLanguage", "description1");
        }
        return renderValues(card.wordLang1!, card.description1!);
    }

    function renderRightSide() {
        if (isForm) {
            return renderInputs("wordLang2", "wordForeignLanguage", "description2");
        }
        return renderValues(card.wordLang2!, card.description2!);
    }

    function renderInputs(inputName: string, inputLabel: string, textareaName: string) {
        return (
            <div>
                {renderInput(inputName, inputLabel)}
                {renderTextarea(textareaName)}
            </div>
        )
    }

    function renderValues(lang: string, description: string) {
        return (
            <div>
                <h1 className="text-3xl my-3">{lang}</h1>
                <p>{description}</p>
            </div>
        )
    }

    function renderDeleteIcon() {
        return isForm && showDelete() && (
            <div className='absolute top-5 right-8 cursor-pointer'>
                <TrashIcon className="h-6 w-6 text-red-500" onClick={onDelete} />
            </div>
        )
    }

    function renderInput(name: any, label: any, desc: any = "fillWord") {
        return (
            <MyInput
                label={dictionary.common[label]}
                placeholder={dictionary.common[desc]}
                inputParams={{ ...register(name, { required: true }) }}
                isValid={isValid(name)} />
        )
    }

    function renderTextarea(name: any, label: any = "description", desc: any = "fillDesc") {
        return (
            <MyTextarea
                label={dictionary.common[label]}
                placeholder={dictionary.common[desc]}
                inputParams={{ ...register(name, { required: false }) }}
                isValid={isValid(name)} />
        )
    }
}

export default FlashcardContainer