"use client"
import Badges from '@/components/common/Badges';
import SingleSidebarInfo from '@/components/common/SingleSidebarInfo';
import LearnStats from '@/components/learn/LearnStats';
import useLocaleStore from '@/stores/useLocaleStore';
import useTrainingStore from '@/stores/useTrainingStore';
import React from 'react'

export default function TrainingSidebar() {
    const { dictionary } = useLocaleStore(state => state);
    const { result, roundFlashcards, roundCount, direction, flashcardSet: { flashcardSet } } = useTrainingStore((state) => state);
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
            value: Math.round(result?.resultPercent * 100) + "%"
        },
        {
            text: dictionary.common.roundCount,
            value: roundCount
        },
        {
            text: dictionary.common.cardsInRoundCount,
            value: roundFlashcards?.length ?? 0
        }
    ]

    const { lang1, lang2 } = flashcardSet || {};
    const languages = direction === "main" ? `${lang1} -> ${lang2}` : `${lang2} -> ${lang1}`

    return (
        <div>
            {renderTitleAndTags()}
            <div className="divider" />
            <SingleSidebarInfo title={dictionary.common.flashcardsCount} value={flashcardSet?.flashcards?.length} />
            <SingleSidebarInfo title={dictionary.common.languages} value={languages} />
            <SingleSidebarInfo title={dictionary.common.level} value={flashcardSet?.level} />
            <div className="divider" />
            <LearnStats stats={statsValues} />

            <br />
        </div>
    )

    function renderTitleAndTags() {
        return (
            <>
                <h1 className="text-4xl text-center mt-3 mb-8">{flashcardSet?.name}</h1>
                <Badges badges={flashcardSet?.hashtags || []} />
            </>
        )
    }
}

