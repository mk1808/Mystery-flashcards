"use client"
import LearnStats from '@/components/learn/LearnStats'
import useAuthStore from '@/stores/useAuthStore'
import useLocaleStore from '@/stores/useLocaleStore'
import useTrainingStore from '@/stores/useTrainingStore'
import { getNestedFieldByPath } from '@/utils/server/objectUtils'
import { findNextRang, getRang } from '@/utils/server/userRangUtils'
import React from 'react'

export default function TrainingResultsSidebar() {
    const { dictionary } = useLocaleStore(state => state);
    const { flashcardSet: { flashcardSet }, result, roundCount } = useTrainingStore((state) => state);
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
            value: Math.round((result?.resultPercent) * 100) + "%"
        },
        {
            text: dictionary.common.roundCount,
            value: roundCount
        }
    ]
    return (
        <div>
            {renderTitle()}
            <div className="divider" />
            <h1 className="text-3xl text-center mt-3 mb-8">{dictionary.common.learningResults} <br /> {dictionary.common.collection}:&nbsp;
                <span className='font-medium'>{flashcardSet?.name}</span>
            </h1>

            <LearnStats stats={statsValues} />
            <br />
        </div>
    )

    function renderTitle() {
        const range = getNestedFieldByPath(dictionary, getRang(currentUser!.rang!)?.name!);
        const toNextLevel = findNextRang(currentUser?.rang!).pointsFrom - currentUser?.points!;
        return (
            <>
                <h1 className="text-4xl text-center mt-3 mb-8">{dictionary.common.gainedPointsAre}
                    <span className='font-semibold text-secondary'>&nbsp;{result?.validCount}&nbsp;</span>
                    {dictionary.common.pointsShortcut}!</h1>
                <h1 className="text-2xl text-left mt-3 mb-8 font-light">{dictionary.common.currentLevelIs}
                    <span className='font-medium'>&nbsp;{range}</span>.<br />
                    {dictionary.common.toNextLevel}
                    <span className='font-medium'>&nbsp;{toNextLevel}&nbsp;</span>
                    {dictionary.common.pointsShortcut}.</h1>
            </>
        )
    }
}