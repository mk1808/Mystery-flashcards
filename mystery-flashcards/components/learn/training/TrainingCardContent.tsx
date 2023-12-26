"use client"
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactNode, useEffect, useState, useRef } from 'react'
import AnswerForm from './AnswerForm';
import useTrainingStore from '@/stores/useTrainingStore';
import { FlashcardT } from '@/models/Flashcard';
import useLocaleStore from '@/stores/useLocaleStore';

function TrainingCardContent({
    flashcardSet,
    roundFlashcardsProp,
    view,
    direction
}: {
    flashcardSet: any,
    roundFlashcardsProp: any,
    view: any,
    direction: string
}) {    
    
    const { roundFlashcards, currentFlashcardIndexInRound, wasChecked } = useTrainingStore((state) => state);
    const { setView, setFlashcardSet, initStore, setRoundFlashcards, setWasChecked, setDirection } = useTrainingStore((state) => state);
    const { dictionary } = useLocaleStore(state => state);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardT>({ wordLang1: "", description1: "" });
    const isMainDirection = direction === "main";
    const { wordLang1, wordLang2, description1, description2 } = currentFlashcard || {};

    useEffect(() => { setView(view) }, [view])
    useEffect(() => { setRoundFlashcards(roundFlashcardsProp); initStore() }, [])
    useEffect(() => { setFlashcardSet(flashcardSet); }, [flashcardSet])
    useEffect(() => { setDirection(direction) }, [direction])
    useEffect(() => { setCurrentFlashcard(roundFlashcards[currentFlashcardIndexInRound]); }, [currentFlashcardIndexInRound, roundFlashcards])

    const getMainWord = () => isMainDirection ? wordLang1 : wordLang2;
    const getSecondaryWord = () => isMainDirection ? wordLang2 : wordLang1;
    const getDescription = () => isMainDirection ? description1 : description2;

    return currentFlashcard && (
        <div className="flex-1 grid sm:grid-cols-2">
            <div className='grid grid-rows-2'>
                <div className='self-end'>
                    <h1 className="text-3xl my-3 ">{getMainWord()}</h1>
                </div>
                <div><p>{getDescription()}</p></div>
                <div className="divider  sm:hidden w-full" />
            </div>
            <div className='flex items-center'>
                <div className="divider hidden sm:flex divider-horizontal ml-0" />
                <div className="w-full h-full grid grid-rows-2">
                    <div className="self-end">
                        <AnswerForm setIsValid={setIsValid} setWasChecked={setWasChecked} />
                    </div>
                    <div>{renderAnswerValidity()}</div>
                </div>
            </div>
        </div>
    )

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
                        <span className="text-primary">{getSecondaryWord()}</span>
                    </span>
                </div>
            </div>
        )
    }
}

export default TrainingCardContent