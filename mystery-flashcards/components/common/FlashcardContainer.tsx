import { FlashcardT } from '@/models/Flashcard'
import React, { useEffect } from 'react'
import { TrashIcon } from "@heroicons/react/24/outline";
import { useForm } from 'react-hook-form';
import MyInput from './form/MyInput';
import MyTextarea from './form/MyTextarea';
import { isFieldValid } from '@/utils/client/FormUtils';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';

function FlashcardContainer({
  card,
  onDelete,
  dictionary
}: {
  card: FlashcardT,
  onDelete?: () => any,
  dictionary: any
}) {


  const updateFlashcard = useNewFlashcardSetStore((state) => state.updateFlashcard)


  const {
    register,
    handleSubmit,
    watch,
    getFieldState,
    formState,
    reset
  } = useForm<FlashcardsForm>({ mode: 'onBlur' });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type)
      updateFlashcard({ ...card, ...value })
    }
    )
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = (data: FlashcardsForm) => console.log(data);
  const onErrors = (errors: any) => console.error(errors);
  const isValid = (name: string) => isFieldValid(name, formState, getFieldState);

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

            </div>
          </div>
          {renderDeleteIcon()}
        </div>
      </div>
    </form>
  )

  function renderLeftSide() {
    if (renderInput != undefined) {
      return (
        <div>
          {renderInput("wordLang1")}
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
    if (renderInput != undefined) {
      return (
        <div>
          {renderInput("wordLang2")}
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
    return onDelete && (
      <div className='absolute top-5 right-8 cursor-pointer'>
        <TrashIcon className="h-6 w-6 text-red-500" onClick={onDelete} />
      </div>
    )
  }

  function renderInput(name: any) {
    return (
      <MyInput
        label={dictionary.common.name}
        placeholder={dictionary.common.fillName}
        inputParams={{ ...register(name, { required: true }) }}
        isValid={isValid(name)} />
    )
  }

  function renderTextarea(name: any) {
    return (
      <MyTextarea
        label={dictionary.common.name}
        placeholder={dictionary.common.fillName}
        inputParams={{ ...register(name, { required: true }) }}
        isValid={isValid(name)} />
    )
  }
}

export default FlashcardContainer