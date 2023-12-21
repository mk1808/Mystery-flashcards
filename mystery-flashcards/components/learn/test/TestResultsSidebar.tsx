import LearnStats from '@/components/learn/LearnStats';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { UserT } from '@/models/User';
import { findNextRang, getRang } from '@/utils/server/userRangUtils';
import React from 'react'

export default async function TestResultsSidebar({
    dictionary,
    flashcardSetDto,
    user
}: {
    dictionary: any,
    flashcardSetDto: FlashCardSetDto,
    user: UserT
}) {

    const statsValues = [
        {
            text: dictionary.common.answersCount,
            value: flashcardSetDto.testResult?.allCount
        }, {
            text: dictionary.common.correctAnswersCount,
            value: flashcardSetDto.testResult?.validCount
        }, {
            text: dictionary.common.correctAnswersPercent,
            value: flashcardSetDto.testResult?.resultPercent?.toFixed(0) + "%"
        }
    ]

    return (
        <div>
            {renderTitle()}
            <div className="divider"></div>
            <h1 className="text-3xl text-center mt-3 mb-8">{dictionary.common.learningResults} <br /> {dictionary.common.collection}: {flashcardSetDto.flashcardSet?.name}</h1>

            <LearnStats stats={statsValues} />
            <br />
        </div>
    )

    function renderTitle() {
        const gainPoints = flashcardSetDto.testResult?.validCount! * 10;
        const range = getRang(user.rang!)
        const toNextLevel = findNextRang(user.rang!).pointsFrom - user.points;
        return (
            <>
                <h1 className="text-4xl text-center mt-3 mb-8">{dictionary.common.gainedPointsAre} {gainPoints} {dictionary.common.pointsShortcut}!</h1>
                <h1 className="text-2xl text-center mt-3 mb-8">{dictionary.common.currentLevelIs} {range?.name}. <br /> {dictionary.common.toNextLevel} {toNextLevel}  {dictionary.common.pointsShortcut}</h1>
            </>
        )
    }
}
