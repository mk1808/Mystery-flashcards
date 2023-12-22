"use client"
import Table from '@/components/common/Table';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { AnswerT } from '@/models/Answer';
import useTrainingStore from '@/stores/useTrainingStore';
import React, { useEffect } from 'react'

function TestResultTable({
    flashcardSetDto,
    dictionary,
    view
}: {
    flashcardSetDto: FlashCardSetDto,
    dictionary: any,
    view: any
}) {
    const setView = useTrainingStore((state) => state.setView);
    const columns = [dictionary.common.numberShortcut, dictionary.common.question, dictionary.common.answer, dictionary.common.correctAnswer, dictionary.common.status]
    useEffect(() => { setView(view) }, [view])

    function getFlashcard(flashcardId: string) {
        return flashcardSetDto.flashcardSet?.flashcards?.find(flashcard => flashcard._id === flashcardId);
    }

    return (
        <Table columns={columns} renderRows={renderRows} />
    )

    function renderRows() {
        return flashcardSetDto.testResult?.answers?.map(renderRow)
    }

    function renderRow(answer: AnswerT, index: number) {
        const flashcard = getFlashcard(answer.flashcardId!)
        return (
            <tr>
                <th>{index + 1}</th>
                <td>{flashcard?.wordLang1}</td>
                <td>{answer.givenAnswer}</td>
                <td>{flashcard?.wordLang2}</td>
                <td>{answer.isCorrect ? dictionary.common.correct : dictionary.common.incorrect} </td>
            </tr>
        )
    }
}

export default TestResultTable