"use client"
import Table from '@/components/common/Table';
import StartLearningModal from '@/components/flashcards/flashcardDetails/StartLearningModal';
import useLocaleStore from '@/stores/useLocaleStore';
import useTrainingStore from '@/stores/useTrainingStore';
import { createTestResult } from '@/utils/client/TrainingUtils';
import React, { useEffect } from 'react'

function ResultTable({
    view
}: {
    view: any
}) {
    const { dictionary } = useLocaleStore(state => state);
    const { allAnswers, flashcardSet, allFlashcards, direction } = useTrainingStore((state) => state);
    const { setView } = useTrainingStore((state) => state);
    const allInfoObjects = createTestResult(allAnswers, allFlashcards);
    const columns = [dictionary.common.numberShortcut, dictionary.common.question, dictionary.common.answer, dictionary.common.correctAnswer, dictionary.common.correctAnswersPercent]
    useEffect(() => { setView(view) }, [view])

    const createAnswersList = (answers: any) => {
        const tabToDisplay: any = [],
            length = answers.length;
        answers.forEach((ans: any, index: number) => {
            let isLast = length == index + 1;
            tabToDisplay.push(renderSingleAnswer(ans, isLast, index));
        });
        return tabToDisplay;
    }

    return (
        <>
            <Table columns={columns} renderRows={renderRows} />
            <StartLearningModal flashcardSet={flashcardSet?.flashcardSet} dialogTriggerClassName='hidden' />
        </>
    )

    function renderRows() {
        return allInfoObjects.map(renderRow)
    }

    function renderRow(flashcard: any, index: number) {
        const { wordLang1, wordLang2 } = flashcard.flashcard
        const isMainDirection = direction === "main";
        const mainWord = isMainDirection ? wordLang1 : wordLang2
        const secondaryWord = isMainDirection ? wordLang2 : wordLang1
        return (
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{mainWord}</td>
                <td className='max-w-[250px]'>{createAnswersList(flashcard.answers)}</td>
                <td>{secondaryWord}</td>
                <td>{flashcard.percent} %</td>
            </tr>
        )
    }

    function renderSingleAnswer(ans: any, isLast: boolean, index: number) {
        return (
            <span className={ans.isCorrect ? "" : "text-red-400"} key={index}>
                {`${ans.givenAnswer}${isLast ? "" : ", "}`}
            </span>
        )
    }
}

export default ResultTable