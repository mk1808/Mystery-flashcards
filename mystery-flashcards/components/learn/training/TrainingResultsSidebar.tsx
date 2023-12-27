"use client"
import LearnStats from '@/components/learn/LearnStats'
import useAuthStore from '@/stores/useAuthStore'
import useLocaleStore from '@/stores/useLocaleStore'
import useTrainingStore from '@/stores/useTrainingStore'
import { getNestedFieldByPath } from '@/utils/server/objectUtils'
import { findNextRang, getRang } from '@/utils/server/userRangUtils'
import React from 'react'
import ResultPointsInfo from '../ResultPointsInfo'
import ResultStatsTitle from '../ResultStatsTitle'

function TrainingResultsSidebar() {
    const { dictionary } = useLocaleStore(state => state);
    const { flashcardSet: { flashcardSet }, result, roundCount } = useTrainingStore((state) => state);
    const currentUser = useAuthStore(state => state.currentUser);
    const pointsInfo = {
        gainPoints: result?.validCount!,
        range: getNestedFieldByPath(dictionary, getRang(currentUser!.rang!)?.name!),
        toNextLevel: findNextRang(currentUser?.rang!).pointsFrom - currentUser?.points!
    }
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
            value: Math.round((result?.resultPercent!) * 100) + "%"
        },
        {
            text: dictionary.common.roundCount,
            value: roundCount
        }
    ]
    return (
        <div>
            <ResultPointsInfo {...pointsInfo} />
            <ResultStatsTitle name={flashcardSet?.name} resultsTypeText={dictionary.common.learningResults} />
            <div className="divider" />
            <LearnStats stats={statsValues} />
            <br />
        </div>
    )
}

export default TrainingResultsSidebar