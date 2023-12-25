"use client"
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactNode, useEffect, useState, useRef } from 'react'
import AnswerForm from './AnswerForm';
import useTrainingStore from '@/stores/useTrainingStore';
import { FlashcardT } from '@/models/Flashcard';

function TrainingCardContent({
    dictionary,
    flashcardSet,
    roundFlashcards,
    view,
    direction
}: {
    dictionary: any,
    flashcardSet: any,
    roundFlashcards: any,
    view: any,
    direction: string
}) {
    const [isValid, setIsValid] = useState<Boolean>(true);
    const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardT>({ wordLang1: "", description1: "" });
    const setView = useTrainingStore((state) => state.setView);
    const setFlashcardSet = useTrainingStore((state) => state.setFlashcardSet);
    const initStore = useTrainingStore((state) => state.initStore);
    const setRoundFlashcards = useTrainingStore((state) => state.setRoundFlashcards);
    const storedRoundFlashcards = useTrainingStore((state) => state.roundFlashcards);
    const currentIndex = useTrainingStore((state) => state.currentFlashcardIndexInRound);
    const wasChecked = useTrainingStore((state) => state.wasChecked);
    const setWasChecked = useTrainingStore((state) => state.setWasChecked);
    const setDirection = useTrainingStore((state) => state.setDirection);

    useEffect(() => { setView(view) }, [view])
    useEffect(() => { setRoundFlashcards(roundFlashcards); initStore() }, [])
    useEffect(() => { setFlashcardSet(flashcardSet); }, [flashcardSet])
    useEffect(() => { setDirection(direction) }, [direction])
    useEffect(() => { setCurrentFlashcard(storedRoundFlashcards[currentIndex]); }, [currentIndex, storedRoundFlashcards])

    const isMainDirection = direction === "main";
    const { wordLang1, wordLang2, description1, description2 } = currentFlashcard || {};
    const getMainWord = () => isMainDirection ? wordLang1 : wordLang2;
    const getSecondaryWord = () => isMainDirection ? wordLang2 : wordLang1;
    const getDescription = () => isMainDirection ? description1 : description2;

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

    return currentFlashcard && (
        <div className="flex-1 grid sm:grid-cols-2">
            <div className='grid grid-rows-2'>
                <div className='self-end'>
                    <h1 className="text-3xl my-3 ">{getMainWord()}</h1>
                </div>
                <div><p>{getDescription()}</p></div>
                <div className="divider  sm:hidden w-full"></div>
            </div>
            <div className='flex items-center'>
                <div className="divider hidden sm:flex divider-horizontal ml-0"></div>
                <div className="w-full h-full grid grid-rows-2">
                    <div className="self-end">
                        <AnswerForm dictionary={dictionary} currentFlashcard={currentFlashcard} setIsValid={setIsValid} setWasChecked={setWasChecked} />
                    </div>
                    <div>{renderAnswerValidity()}</div>
                </div>
            </div>
        </div>
    )
}

export default TrainingCardContent