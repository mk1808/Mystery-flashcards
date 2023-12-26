"use client"
import React, { useEffect, useState } from 'react'
import { FlashcardT } from '@/models/Flashcard';
import useTestStore from '@/stores/useTestStore';
import TestAnswerForm from './TestAnswerForm';
import useTrainingStore from '@/stores/useTrainingStore';

function TestCardContent({
    flashcardSet,
    testFlashcards,
    view,
    direction
}: {
    flashcardSet: any,
    testFlashcards: any,
    view: any,
    direction: string
}) {
    const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardT>({ wordLang1: "", description1: "" });
    const { currentFlashcardIndex } = useTestStore((state) => state);
    const { setFlashcardSet, setDirection, setTestFlashcards, initStore } = useTestStore((state) => state);
    const { setView } = useTrainingStore((state) => state);

    useEffect(() => { setView(view) }, [view])
    useEffect(() => { setFlashcardSet(flashcardSet); initStore(); }, [flashcardSet])
    useEffect(() => { setTestFlashcards(testFlashcards) }, [testFlashcards])
    useEffect(() => { setDirection(direction) }, [direction])
    useEffect(() => { setCurrentFlashcard(testFlashcards[currentFlashcardIndex]) }, [currentFlashcardIndex])

    const getWord = () => direction === "main" ? currentFlashcard?.wordLang1 : currentFlashcard?.wordLang2;
    const getDescription = () => direction === "main" ? currentFlashcard?.description1 : currentFlashcard?.description2;

    return (
        <div className="grid sm:grid-cols-2 h-full">
            <div className='grid grid-rows-2'>
                <div className='self-end'>
                    <h1 className="text-3xl my-3 ">{getWord()}</h1>
                </div>
                <div><p>{getDescription()}</p></div>
                <div className="divider  sm:hidden w-full" />
            </div>
            <div className='flex items-center'>
                <div className="divider hidden sm:flex divider-horizontal ml-0" />
                <div className="w-full h-full grid grid-rows-2">
                    <div className="self-end">
                        <TestAnswerForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestCardContent