"use client"
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactNode, useEffect } from 'react'
import AnswerForm from './AnswerForm';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';
import useTrainingStore from '@/stores/useTrainingStore';

function TrainingCardContent({ dictionary, flashcardSet }: { dictionary: any, flashcardSet:any }) {
    const isValid: Boolean = true;
    const setFlashcardSet = useTrainingStore((state) => state.setFlashcardSet);
    useEffect(()=>{setFlashcardSet(flashcardSet)}, [flashcardSet])
    function renderAnswerValidity() {
        return (
            <div className="my-4 grid grid-col items-center">
                {isValid ? renderValid() : renderInvalid()}{JSON.stringify(flashcardSet)}
            </div>
        );
    }

    function renderValid(): ReactNode {
        return (
            <div className='grid-row flex items-center'>
                <CheckCircleIcon className="h-8 w-8 mr-2 text-gray-500" />
                <span className="text-xl">Poprawna odpowiedź!</span>
            </div>
        );
    }

    function renderInvalid(): ReactNode {
        return (
            <div className="grid-row items-center">
                <div className='flex items-center'>
                    <XCircleIcon className="h-8 w-8 mr-2 text-gray-500" />
                    <span className="text-xl">Błędna odpowiedź</span>
                </div>
                <div className="flex flex-col my-2">
                    <span className="text-xl">Poprawna odpowiedź to:&nbsp;
                        <span className="text-primary">animal</span>
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 h-full">
            <div className='grid grid-rows-2'>
                <div className='self-end'>
                    <h1 className="text-3xl my-3 ">{"card.wordLang1"}</h1>
                </div>
                <div><p>{"card.description1"}</p></div>
            </div>
            <div className='flex items-center'>
                <div className="divider divider-horizontal ml-0"></div>
                <div className="w-full h-full grid grid-rows-2">

                    <div className="self-end">
                        <AnswerForm dictionary={dictionary}/>
                    </div>
                    <div>{renderAnswerValidity()}</div>
                </div>
            </div>
        </div>

    )
}

export default TrainingCardContent