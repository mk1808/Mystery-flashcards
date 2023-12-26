"use client"
import React, { useEffect, useState } from 'react'
import { FlashcardT } from '@/models/Flashcard';
import useTestStore from '@/stores/useTestStore';
import TestAnswerForm from './TestAnswerForm';
import useTrainingStore from '@/stores/useTrainingStore';
import { FlashcardSetT } from '@/models/FlashcardSet';
import { LearnViewType } from '@/enums/LearnViewOptions';
import { DirectionType, DirectionOptions } from '@/enums/DirectionOptions';
import LearnCardWordAndDesc from '../LearnCardWordAndDesc';
import LearnCardContent from '../LearnCardContent';

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
        <LearnCardContent
            questionSide={
                <>
                    <LearnCardWordAndDesc word={getWord()} description={getDescription()} />
                    <div className="divider sm:hidden w-full" />
                </>
            }
            answerSide={
                <div className="self-end">
                    <TestAnswerForm />
                </div>
            }
        />

    )
}

export default TestCardContent