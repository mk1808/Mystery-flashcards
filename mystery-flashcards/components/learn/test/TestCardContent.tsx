"use client"
import React, { useEffect, useState } from 'react'
import { FlashcardT } from '@/models/Flashcard';
import useTestStore from '@/stores/useTestStore';
import TestAnswerForm from './TestAnswerForm';
import useTrainingStore from '@/stores/useTrainingStore';

function TestCardContent({
    dictionary,
    flashcardSet,
    testFlashcards
}: {
    dictionary: any,
    flashcardSet: any,
    testFlashcards: any
}) {
    const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardT>({ wordLang1: "", description1: "" });
    const setFlashcardSet = useTestStore((state) => state.setFlashcardSet);
    const setTestFlashcards = useTestStore((state) => state.setTestFlashcards);
    const currentIndex = useTestStore((state) => state.currentFlashcardIndex);
    const setView = useTrainingStore((state) => state.setView);

    useEffect(() => { setView("TEST") }, [])
    useEffect(() => { setFlashcardSet(flashcardSet) }, [flashcardSet])
    useEffect(() => { setTestFlashcards(testFlashcards) }, [testFlashcards])
    useEffect(() => { setCurrentFlashcard(testFlashcards[currentIndex]) }, [currentIndex])

    return (
        <div className="grid grid-cols-2 h-full">
            <div className='grid grid-rows-2'>
                <div className='self-end'>
                    <h1 className="text-3xl my-3 ">{currentFlashcard?.wordLang1}</h1>
                </div>
                <div><p>{currentFlashcard?.description1}</p></div>
            </div>
            <div className='flex items-center'>
                <div className="divider divider-horizontal ml-0"></div>
                <div className="w-full h-full grid grid-rows-2">
                    <div className="self-end">
                        <TestAnswerForm dictionary={dictionary} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestCardContent