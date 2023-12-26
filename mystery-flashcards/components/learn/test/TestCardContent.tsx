"use client"
import React, { useEffect, useState } from 'react'
import { FlashcardT } from '@/models/Flashcard';
import useTestStore from '@/stores/useTestStore';
import TestAnswerForm from './TestAnswerForm';
import useTrainingStore from '@/stores/useTrainingStore';
import { FlashcardSetT } from '@/models/FlashcardSet';
import { LearnViewType } from '@/enums/LearnViewOptions';
import { DirectionType, DirectionOptions } from '@/enums/DirectionOptions';

function TestCardContent({
    flashcardSet,
    testFlashcards,
    view,
    direction
}: {
    flashcardSet: FlashcardSetT,
    testFlashcards: FlashcardT[],
    view: LearnViewType,
    direction: DirectionType
}) {
    const { currentFlashcardIndex } = useTestStore((state) => state);
    const { setFlashcardSet, setDirection, setTestFlashcards, initStore } = useTestStore((state) => state);
    const { setView } = useTrainingStore((state) => state);
    const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardT>({ wordLang1: "", description1: "" });

    useEffect(() => { setView(view) }, [view])
    useEffect(() => { setFlashcardSet(flashcardSet); initStore(); }, [flashcardSet])
    useEffect(() => { setTestFlashcards(testFlashcards) }, [testFlashcards])
    useEffect(() => { setDirection(direction) }, [direction])
    useEffect(() => { setCurrentFlashcard(testFlashcards[currentFlashcardIndex]) }, [currentFlashcardIndex])

    const getWord = () => direction === DirectionOptions.MAIN ? currentFlashcard?.wordLang1 : currentFlashcard?.wordLang2;
    const getDescription = () => direction === DirectionOptions.MAIN ? currentFlashcard?.description1 : currentFlashcard?.description2;

    return (
        <div className="grid sm:grid-cols-2 h-full">
            <div className='grid grid-rows-2'>
                {renderWordAndDesc()}
                <div className="divider sm:hidden w-full" />
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

    function renderWordAndDesc() {
        return (
            <>
                <div className='self-end'>
                    <h1 className="text-3xl my-3">{getWord()}</h1>
                </div>
                <div>
                    <p>{getDescription()}</p>
                </div>
            </>
        )
    }
}

export default TestCardContent