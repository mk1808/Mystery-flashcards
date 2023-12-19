"use client"
import Table from '@/components/common/Table';
import useTrainingStore from '@/stores/useTrainingStore';
import { createAnswersList, createTestResult } from '@/utils/client/TrainingUtils';
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
    const allInfoObjects = createTestResult(allAnswers, allFlashcards);
    const setView = useTrainingStore((state) => state.setView);
    const columns = [dictionary.common.numberShortcut, dictionary.common.question, dictionary.common.answer, dictionary.common.correctAnswer, dictionary.common.correctAnswersPercent]
    useEffect(() => { setView(view) }, [])
    return (<Table columns={columns} renderRows={renderRows} />)

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
                <td>{createAnswersList(flashcard.answers)}</td>
                <td>{flashcard.flashcard.wordLang2}</td>
                <td>{flashcard.percent} %</td>
            </tr>
        )
    }
}

export default ResultTable