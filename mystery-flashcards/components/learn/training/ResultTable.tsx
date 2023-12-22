"use client"
import Table from '@/components/common/Table';
import StartLearningModal from '@/components/flashcards/flashcardDetails/StartLearningModal';
import useTrainingStore from '@/stores/useTrainingStore';
import { createTestResult } from '@/utils/client/TrainingUtils';
import React, { useEffect } from 'react'

function ResultTable({
    view,
    dictionary,
    locale
}: {
    view: any,
    dictionary: any,
    locale: string
}) {
    const allAnswers = useTrainingStore((state) => state.allAnswers);
    const flashcardSet = useTrainingStore((state) => state.flashcardSet);
    const allFlashcards = useTrainingStore((state) => state.allFlashcards);
    const allInfoObjects = createTestResult(allAnswers, allFlashcards);
    const setView = useTrainingStore((state) => state.setView);
    const columns = [dictionary.common.numberShortcut, dictionary.common.question, dictionary.common.answer, dictionary.common.correctAnswer, dictionary.common.correctAnswersPercent]
    useEffect(() => { setView(view) }, [view])

    const createAnswersList = (answers: any) => {
        const tabToDisplay: any = [],
            length = answers.length;
        answers.forEach((ans: any, index: number) => {
            let isLast = length == index + 1;
            tabToDisplay.push(renderSingleAnswer(ans, isLast));
        });
        return tabToDisplay;
    }

    return (
        <>
            <Table columns={columns} renderRows={renderRows} />
            <StartLearningModal dictionary={dictionary} flashcardSet={flashcardSet?.flashcardSet} locale={locale} dialogTriggerClassName='hidden' />
        </>
    )

    function renderRows() {
        return allInfoObjects.map((flashcard: any, index: number) => (
            renderRow(flashcard, index)
        ))
    }

    function renderRow(flashcard: any, index: number) {
        return (
            <tr>
                <th>{index + 1}</th>
                <td>{flashcard.flashcard.wordLang1}</td>
                <td className='max-w-[250px]'>{createAnswersList(flashcard.answers)}</td>
                <td>{flashcard.flashcard.wordLang2}</td>
                <td>{flashcard.percent} %</td>
            </tr>
        )
    }

    function renderSingleAnswer(ans: any, isLast: boolean) {
        return (
            <span className={ans.isCorrect ? "" : "text-red-400"}>
                {`${ans.givenAnswer}${isLast ? "" : ", "}`}
            </span>
        )
    }
}

export default ResultTable