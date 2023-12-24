"use client"
import React, { useEffect, useState } from 'react'
import { FlashcardT } from '@/models/Flashcard';
import useTestStore from '@/stores/useTestStore';
import TestAnswerForm from './TestAnswerForm';
import useTrainingStore from '@/stores/useTrainingStore';

function TestCardContent({
    dictionary,
    flashcardSet,
    testFlashcards,
    view,
    direction,
    locale
}: {
    dictionary: any,
    flashcardSet: any,
    testFlashcards: any,
    view: any,
    direction: string,
    locale: string
}) {
    const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardT>({ wordLang1: "", description1: "" });
    const setFlashcardSet = useTestStore((state) => state.setFlashcardSet);
    const setDirection = useTestStore((state) => state.setDirection);
    const setTestFlashcards = useTestStore((state) => state.setTestFlashcards);
    const initStore = useTestStore((state) => state.initStore);
    const currentIndex = useTestStore((state) => state.currentFlashcardIndex);
    const setView = useTrainingStore((state) => state.setView);

    useEffect(() => { setView(view) }, [view])
    useEffect(() => { setFlashcardSet(flashcardSet) }, [flashcardSet])
    useEffect(() => { setTestFlashcards(testFlashcards) }, [testFlashcards])
    useEffect(() => { setDirection(direction) }, [direction])
    useEffect(() => { setCurrentFlashcard(testFlashcards[currentIndex]) }, [currentIndex])

    const getWord = () => direction === "main" ? currentFlashcard?.wordLang1 : currentFlashcard?.wordLang2;
    const getDescription = () => direction === "main" ? currentFlashcard?.description1 : currentFlashcard?.description2;

    return (
        <div className="grid sm:grid-cols-2 h-full">
            <div className='grid grid-rows-2'>
                <div className='self-end'>
                    <h1 className="text-3xl my-3 ">{getWord()}</h1>
                </div>
                <div><p>{getDescription()}</p></div>
                <div className="divider  sm:hidden w-full"></div>
            </div>
            <div className='flex items-center'>
                <div className="divider hidden sm:flex divider-horizontal ml-0"></div>
                <div className="w-full h-full grid grid-rows-2">
                    <div className="self-end">
                        <TestAnswerForm dictionary={dictionary} locale={locale} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestCardContent