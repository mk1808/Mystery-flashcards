"use client"
import Table from '@/components/common/Table';
import StartLearningModal from '@/components/flashcards/flashcardDetails/StartLearningModal';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { AnswerT } from '@/models/Answer';
import useLocaleStore from '@/stores/useLocaleStore';
import useTrainingStore from '@/stores/useTrainingStore';
import React, { useEffect } from 'react'

function TestResultTable({
    flashcardSetDto,
    view
}: {
    flashcardSetDto: FlashCardSetDto,
    view: any
}) {
    const { dictionary } = useLocaleStore(state => state);
    const { setView, setFlashcardSet } = useTrainingStore((state) => state);
    const columns = [dictionary.common.numberShortcut, dictionary.common.question, dictionary.common.answer, dictionary.common.correctAnswer, dictionary.common.status]
    useEffect(() => { setView(view) }, [view])
    useEffect(() => { setFlashcardSet(flashcardSetDto) }, [flashcardSetDto])

    function getFlashcard(flashcardId: string) {
        return flashcardSetDto.flashcardSet?.flashcards?.find(flashcard => flashcard._id === flashcardId);
    }

    return (
        <>
            <Table columns={columns} renderRows={renderRows} />
            <StartLearningModal flashcardSet={flashcardSetDto?.flashcardSet} dialogTriggerClassName='hidden' />
        </>
    )

    function renderRows() {
        return flashcardSetDto.testResult?.answers?.map(renderRow)
    }

    function renderRow(answer: AnswerT, index: number) {
        const { wordLang1, wordLang2 } = getFlashcard(answer.flashcardId!)!
        const isMainDirection = flashcardSetDto.testResult?.direction === "main";
        const mainWord = isMainDirection ? wordLang1 : wordLang2;
        const secondaryWord = isMainDirection ? wordLang2 : wordLang1;
        return (
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{mainWord}</td>
                <td>{answer.givenAnswer}</td>
                <td>{secondaryWord}</td>
                <td>{answer.isCorrect ? dictionary.common.correct : dictionary.common.incorrect} </td>
            </tr>
        )
    }
}

export default TestResultTable