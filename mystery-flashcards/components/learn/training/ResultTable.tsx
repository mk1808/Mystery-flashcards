"use client"
import useTrainingStore from '@/stores/useTrainingStore';
import React from 'react'

function ResultTable() {
    const allAnswers = useTrainingStore((state) => state.allAnswers);
    const allFlashcards = useTrainingStore((state) => state.allFlashcards);
    const distinctFlashcardsIds = allFlashcards.map(item => item._id)
        .filter((value, index, self) => self.indexOf(value) === index)
    console.log("f", distinctFlashcardsIds);
    const flashcardsIds = allFlashcards.map((card: any) => card._id);
    const uniqueIds = [...new Set(flashcardsIds)]; const myMap = new Map<string, any>([]);
    const allInfoObjects: any = [];
    function getAllIndexes(arr: any, val: any) {
        var indexes = [], i;
        for (i = 0; i < arr.length; i++)
            if (arr[i] === val)
                indexes.push(i);
        return indexes;
    }

    uniqueIds.forEach((id: any) => {
        const indexes = getAllIndexes(flashcardsIds, id);
        myMap.set(id, indexes);
    })
    uniqueIds.forEach((id: any) => {
        const indexes = myMap.get(id);
        const firstId = indexes[0];
        const flashcard = allFlashcards[firstId];
        const answers: any = [];
        const userAnswers: any = [];
        const userAnswersValidity: any = [];
        indexes.forEach((id: any) => {
            const currentAnswer = allAnswers[id]
            answers.push(currentAnswer);
            userAnswers.push(currentAnswer.givenAnswer);
            userAnswersValidity.push(currentAnswer.isCorrect)


        })
        const allAnswersNumber = userAnswers.length,
            correctAnswersNumber = userAnswersValidity.filter((ans: any) => ans == true).length,
            percent = (correctAnswersNumber * 100.0 / allAnswersNumber).toFixed(2);
        allInfoObjects.push({ id: firstId, flashcard, answers, userAnswers, allAnswersNumber, correctAnswersNumber, percent })
    })
    console.log(allInfoObjects);
    return (

        <div className="overflow-x-auto">
            <table className="table">

                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>Pytanie</th>
                        <th>Odpowiedzi</th>
                        <th>Poprawna odpowiedź</th>
                        <th>% poprawnych</th>
                    </tr>
                </thead>
                <tbody>
                    {allInfoObjects.map((flashcard: any, index: number) => (
                        renderRow(flashcard, index)
                    ))}



                </tbody>
            </table>
        </div>
    )

    function renderRow(flashcard: any, index: number) {
        return (

            <tr>
                <th>{index + 1}</th>
                <td>{flashcard.flashcard.wordLang1}</td>
                <td>{createAnsDisplay(flashcard.answers)}</td>
                <td>{flashcard.flashcard.wordLang2}</td>
                <td>{flashcard.percent} %</td>
            </tr>
        )
    }

    function createAnsDisplay(answers: any) {
        let ansDisplay = ""
        answers.forEach((ans: any) => ansDisplay += (ans.givenAnswer + ","));
        return ansDisplay.slice(0, -1);
    }
}

export default ResultTable