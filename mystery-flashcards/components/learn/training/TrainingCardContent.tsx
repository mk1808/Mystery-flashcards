"use client"
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactNode, useEffect, useState, useRef } from 'react'
import AnswerForm from './AnswerForm';
import useTrainingStore from '@/stores/useTrainingStore';
import { FlashcardT } from '@/models/Flashcard';

function TrainingCardContent({ dictionary, flashcardSet, roundFlashcards, view }:
     { dictionary: any, flashcardSet: any, roundFlashcards: any, view:any }) {
    const [isValid, setIsValid] = useState<Boolean>(true);
    const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardT>({wordLang1:"", description1:""});
    const setView = useTrainingStore((state) => state.setView);
    const setFlashcardSet = useTrainingStore((state) => state.setFlashcardSet);
    const setRoundFlashcards = useTrainingStore((state) => state.setRoundFlashcards);
    const currentIndex = useTrainingStore((state) => state.currentFlashcardIndexInRound); 
    const wasChecked = useTrainingStore((state) => state.wasChecked); 
    const setWasChecked = useTrainingStore((state) => state.setWasChecked); 
    const currentIndexRef = useRef<any>(null);
    currentIndexRef.current = currentIndex;
    const wasCheckedRef = useRef<any>(null);
    wasCheckedRef.current = wasChecked;
    useEffect(() => { setView(view) }, [view])
    useEffect(() => { console.log("FS:",flashcardSet); setFlashcardSet(flashcardSet);  }, [flashcardSet])
    useEffect(() => { 
        setRoundFlashcards(roundFlashcards);
        setCurrentFlashcard(roundFlashcards[currentIndexRef.current]);
    }, [wasChecked])

    function renderAnswerValidity() {
        return (
            <div className="my-4 grid grid-col items-center">
                {renderValidity()}
            </div>
        );
    }

    function renderValidity() {
        if (wasChecked) {
            return <> {isValid ? renderValid() : renderInvalid()} </>
        }
        return <></>
    }

    function renderValid(): ReactNode {
        return (
            <div className='grid-row flex items-center'>
                <CheckCircleIcon className="h-8 w-8 mr-2 text-gray-500" />
                <span className="text-xl">{dictionary.common.correctAnswer}!</span>
            </div>
        );
    }

    function renderInvalid(): ReactNode {
        return (
            <div className="grid-row items-center">
                <div className='flex items-center'>
                    <XCircleIcon className="h-8 w-8 mr-2 text-gray-500" />
                    <span className="text-xl">{dictionary.common.incorrectAnswer}</span>
                </div>
                <div className="flex flex-col my-2">
                    <span className="text-xl">{dictionary.common.correctAnswerIs}:&nbsp;
                        <span className="text-primary">{currentFlashcard.wordLang2}</span>
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 h-full">
            <div className='grid grid-rows-2'>
                <div className='self-end'>
                    <h1 className="text-3xl my-3 ">{currentFlashcard.wordLang1}</h1>
                </div>
                <div><p>{currentFlashcard.description1}</p></div>
            </div>
            <div className='flex items-center'>
                <div className="divider divider-horizontal ml-0"></div>
                <div className="w-full h-full grid grid-rows-2">
                    <div className="self-end">
                        <AnswerForm dictionary={dictionary} currentFlashcard={currentFlashcard} setIsValid={setIsValid} setWasChecked={setWasChecked}/>
                    </div>
                    <div>{renderAnswerValidity()}</div>
                </div>
            </div>
        </div>
    )
}

export default TrainingCardContent