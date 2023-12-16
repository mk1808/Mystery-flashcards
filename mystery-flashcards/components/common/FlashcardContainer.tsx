"use client"
import { FlashcardT } from '@/models/Flashcard'
import React, { useEffect, useRef } from 'react'
import { TrashIcon } from "@heroicons/react/24/outline";
import { useForm } from 'react-hook-form';
import MyInput from './form/MyInput';
import MyTextarea from './form/MyTextarea';
import { isFieldValid } from '@/utils/client/FormUtils';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';

function FlashcardContainer({
  card,
  isForm,
  dictionary
}: {
  card: FlashcardT,
  isForm?: boolean,
  dictionary: any
}) {

  const updateFlashcard = useNewFlashcardSetStore((state) => state.updateFlashcard);
  const addFlashcard = useNewFlashcardSetStore((state) => state.addFlashcard);
  const deleteFlashcard = useNewFlashcardSetStore((state) => state.deleteFlashcard);
  const flashcardsList = useNewFlashcardSetStore((state) => state.flashcardsList)
  const flashcardListInvalidCountInc = useNewFlashcardSetStore((state) => state.flashcardListInvalidCountInc);
  const flashcardListInvalidCountDec = useNewFlashcardSetStore((state) => state.flashcardListInvalidCountDec);
  const allFlashCards = useRef(flashcardsList)
  const lastValidationState = useRef(true)

  useEffect(() => {
    allFlashCards.current = flashcardsList
  }, [flashcardsList])

  const {
    register,
    handleSubmit,
    watch,
    getFieldState,
    formState,
  } = useForm<FlashcardsForm>({ mode: 'onBlur' });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type)
      updateFlashcard({ ...card, ...value })
      const lastFlashcard = allFlashCards.current[allFlashCards.current.length - 1],
        isLast = lastFlashcard._id === card._id;
      if (isLast) {
        addFlashcard();
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(()=>{
    const isDirty = Object.keys(formState.dirtyFields).length > 0
    if(isDirty && lastValidationState.current != formState.isValid){
      if(formState.isValid){
        flashcardListInvalidCountDec()
      } else {
        flashcardListInvalidCountInc()
      }
      lastValidationState.current = formState.isValid
    }
  },[formState])

  const onSubmit = (data: FlashcardsForm) => console.log(data);
  const onErrors = (errors: any) => console.error(errors);
  const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
  const isDirty = () =>  Object.keys(formState.dirtyFields).length > 0
  const showDelete = () => isDirty() && flashcardsList.length > 1;

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div className="card w-[1000px] bg-base-100 shadow-xl mb-10">
        <div className="card-body">
          <div className="flex justify-around">
            <div className="w-full justify-end">
              {renderLeftSide()}
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="w-full">
              {renderRightSide()}
            </div>
          </div>
          {renderDeleteIcon()}
        </div>
      </div>
    </form>
  )

  function renderLeftSide() {
    if (isForm) {
      return (
        <div>
          {renderInput("wordLang1", "wordBasicLanguage")}
          {renderTextarea("description1")}
        </div>
      );
    }
    return (
      <div>
        <h1 className="text-3xl my-3">{card.wordLang1}</h1>
        <p>{card.description1}</p>
      </div>
    );
  }

  function renderRightSide() {
    if (isForm) {
      return (
        <div>
          {renderInput("wordLang2", "wordForeignLanguage")}
          {renderTextarea("description2")}
        </div>
      );
    }
    return (
      <div>
        <h1 className="text-3xl my-3">{card.wordLang2}</h1>
        <p>{card.description2}</p>
      </div>
    );
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

  function onDelete() {
    if(!formState.isValid){
      flashcardListInvalidCountDec()
    }
    deleteFlashcard(card);
  }
}

export default FlashcardContainer