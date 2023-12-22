"use client"
import Table from '@/components/common/Table';
import useTrainingStore from '@/stores/useTrainingStore';
import { createTestResult } from '@/utils/client/TrainingUtils';
import React, { useEffect } from 'react'

function ResultTable({
    view,
    dictionary
}: {
    view: any,
    dictionary: any
}) {
    const allAnswers = useTrainingStore((state) => state.allAnswers);
    const allFlashcards = useTrainingStore((state) => state.allFlashcards);
    const direction = useTrainingStore((state) => state.direction);
    const allInfoObjects = createTestResult(allAnswers, allFlashcards);
    const setView = useTrainingStore((state) => state.setView);
    const columns = [dictionary.common.numberShortcut, dictionary.common.question, dictionary.common.answer, dictionary.common.correctAnswer, dictionary.common.correctAnswersPercent]
    useEffect(() => { setView(view) }, [])

    const createAnswersList = (answers: any) => {
        const tabToDisplay: any = [],
            length = answers.length;
        answers.forEach((ans: any, index: number) => {
            let isLast = length == index + 1;
            tabToDisplay.push(renderSingleAnswer(ans, isLast));
        });
        return tabToDisplay;
    }

    return (<Table columns={columns} renderRows={renderRows} />)

    function renderRows() {
        return allInfoObjects.map((flashcard: any, index: number) => (
            renderRow(flashcard, index)
        ))
    }

    function renderRow(flashcard: any, index: number) {
        const { wordLang1, wordLang2} = flashcard.flashcard
        const isMainDirection = direction === "main";
        const mainWord = isMainDirection ? wordLang1 : wordLang2
        const secondaryWord = isMainDirection ? wordLang2 : wordLang1
        return (
            <tr>
                <th>{index + 1}</th>
                <td>{mainWord}</td>
                <td className='max-w-[250px]'>{createAnswersList(flashcard.answers)}</td>
                <td>{secondaryWord}</td>
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