"use client"
import LearnStats from '@/components/learn/LearnStats'
import useAuthStore from '@/stores/useAuthStore'
import useTrainingStore from '@/stores/useTrainingStore'
import { findNextRang, getRang } from '@/utils/server/userRangUtils'
import React from 'react'

export default function TrainingResultsSidebar({
    dictionary
}: {
    dictionary: any
}) {
    const { flashcardSet } = useTrainingStore((state) => state.flashcardSet);
    const { result } = useTrainingStore((state) => state);
    const { finalResult } = useTrainingStore((state) => state);
    const { roundFlashcards } = useTrainingStore((state) => state);
    const currentUser = useAuthStore(state => state.currentUser);
    const statsValues = [
        {
            text: dictionary.common.answersCount,
            value: result?.allCount
        },
        {
            text: dictionary.common.correctAnswersCount,
            value: result?.validCount
        },
        {
            text: dictionary.common.correctAnswersPercent,
            value: result?.resultPercent + "%"
        }
    ]
    return (
        <div>
            {renderTitle()}
            <div className="divider"></div>
            <h1 className="text-3xl text-center mt-3 mb-8">{dictionary.common.learningResults} <br /> {dictionary.common.collection}: {flashcardSet?.name}</h1>

            <LearnStats stats={statsValues} />
            <br />
        </div>
    )

    function renderTitle() {
        const range = getRang(currentUser?.rang!)
        const toNextLevel = findNextRang(currentUser?.rang!).pointsFrom - currentUser?.points!;
        return (
            <>
                <h1 className="text-4xl text-center mt-3 mb-8">{dictionary.common.gainedPointsAre} {finalResult?.newPoints} {dictionary.common.pointsShortcut}!</h1>
                <h1 className="text-2xl text-center mt-3 mb-8">{dictionary.common.currentLevelIs} {range?.name}. <br /> {dictionary.common.toNextLevel} {toNextLevel} {dictionary.common.pointsShortcut}</h1>
            </>
        )
    }
}