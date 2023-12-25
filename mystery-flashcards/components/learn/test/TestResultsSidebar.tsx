import LearnStats from '@/components/learn/LearnStats';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { UserT } from '@/models/User';
import useLocaleStore from '@/stores/useLocaleStore';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { findNextRang, getRang } from '@/utils/server/userRangUtils';
import React from 'react'

export default async function TestResultsSidebar({
    flashcardSetDto,
    user
}: {
    flashcardSetDto: FlashCardSetDto,
    user: UserT
}) {
    const { dictionary } = useLocaleStore(state => state);

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
            <h1 className="text-3xl text-center mt-3 mb-8">{dictionary.common.testingResults} <br />
                {dictionary.common.collection}:&nbsp;
                <span className='font-medium'>{flashcardSetDto.flashcardSet?.name}</span>
            </h1>

            <LearnStats stats={statsValues} />
            <br />
        </div>
    )

    function renderTitle() {
        const gainPoints = flashcardSetDto.testResult?.validCount! * 10;
        const range = getNestedFieldByPath(dictionary, getRang(user!.rang!)?.name!);
        const toNextLevel = findNextRang(user.rang!).pointsFrom - user.points;
        return (
            <>
                <h1 className="text-4xl text-center mt-3 mb-8">{dictionary.common.gainedPointsAre}
                    <span className='font-semibold text-secondary'>&nbsp;{gainPoints}&nbsp;</span>
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
