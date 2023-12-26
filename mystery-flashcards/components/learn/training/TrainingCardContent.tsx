"use client"
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactNode, useEffect, useState, useRef } from 'react'
import AnswerForm from './AnswerForm';
import useTrainingStore from '@/stores/useTrainingStore';
import { FlashcardT } from '@/models/Flashcard';
import useLocaleStore from '@/stores/useLocaleStore';
import { FlashcardSetT } from '@/models/FlashcardSet';
import { LearnViewType } from '@/enums/LearnViewOptions';
import { DirectionOptions, DirectionType } from '@/enums/DirectionOptions';
import LearnCardWordAndDesc from '../LearnCardWordAndDesc';
import LearnCardContent from '../LearnCardContent';

function TrainingCardContent({
    flashcardSet,
    roundFlashcardsProp,
    view,
    direction
}: {
    flashcardSet: FlashcardSetT,
    roundFlashcardsProp: FlashcardT[],
    view: LearnViewType,
    direction: DirectionType
}) {

    const { roundFlashcards, currentFlashcardIndexInRound, wasChecked } = useTrainingStore((state) => state);
    const { setView, setFlashcardSet, initStore, setRoundFlashcards, setWasChecked, setDirection } = useTrainingStore((state) => state);
    const { dictionary } = useLocaleStore(state => state);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardT>({ wordLang1: "", description1: "" });
    const isMainDirection = direction === DirectionOptions.MAIN;
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
        <LearnCardContent
            questionSide={
                <>
                    <LearnCardWordAndDesc word={getMainWord()} description={getDescription()} />
                    <div className="divider sm:hidden w-full" />
                </>
            }
            answerSide={
                <>
                    <div className="self-end">
                        <AnswerForm setIsValid={setIsValid} setWasChecked={setWasChecked} />
                    </div>
                    <div>{renderAnswerValidity()}</div>
                </>
            }
        />

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