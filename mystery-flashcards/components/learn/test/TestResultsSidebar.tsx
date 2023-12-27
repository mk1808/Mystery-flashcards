"use client"
import LearnStats from '@/components/learn/LearnStats';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { UserT } from '@/models/User';
import useLocaleStore from '@/stores/useLocaleStore';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { findNextRang, getRang } from '@/utils/server/userRangUtils';
import React from 'react'
import ResultPointsInfo from '../ResultPointsInfo';
import ResultStatsTitle from '../ResultStatsTitle';

function TestResultsSidebar({ flashcardSetDto, user }: { flashcardSetDto: FlashCardSetDto, user: UserT }) {
    const { dictionary } = useLocaleStore(state => state);
    const pointsInfo = {
        gainPoints: flashcardSetDto.testResult?.validCount! * 10,
        range: getNestedFieldByPath(dictionary, getRang(user!.rang!)?.name!),
        toNextLevel: findNextRang(user.rang!).pointsFrom - user.points
    }
    const statsValues = [
        {
            text: dictionary.common.answersCount,
            value: flashcardSetDto.testResult?.allCount
        },
        {
            text: dictionary.common.correctAnswersCount,
            value: flashcardSetDto.testResult?.validCount
        },
        {
            text: dictionary.common.correctAnswersPercent,
            value: flashcardSetDto.testResult?.resultPercent?.toFixed(0) + "%"
        }
    ]

    return (
        <div>
            <ResultPointsInfo {...pointsInfo} />
            <div className="divider" />
            <ResultStatsTitle name={flashcardSetDto.flashcardSet?.name} resultsTypeText={dictionary.common.testingResults} />
            <LearnStats stats={statsValues} />
            <br />
        </div>
    )
}

export default TestResultsSidebar