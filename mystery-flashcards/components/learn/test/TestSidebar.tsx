"use client"
import Badges from '@/components/common/Badges';
import SingleSidebarInfo from '@/components/common/SingleSidebarInfo'
import LearnStats from '@/components/learn/LearnStats';
import { DirectionOptions } from '@/enums/DirectionOptions';
import useLocaleStore from '@/stores/useLocaleStore';
import useTestStore from '@/stores/useTestStore';
import { getLangsDirection } from '@/utils/client/TrainingUtils';
import React from 'react'

function TestSidebar() {
    const { dictionary } = useLocaleStore(state => state);
    const { testAnswers, testFlashcards, direction, flashcardSet: { flashcardSet } } = useTestStore((state) => state);
    const progress = (testAnswers.length * 100 / testFlashcards?.length).toFixed(0) + "%";
    const statsValues = [
        {
            text: dictionary.common.answersCount,
            value: testAnswers.length
        },
        {
            text: dictionary.common.progress,
            value: progress
        }
    ]

    const { lang1, lang2 } = flashcardSet || {};

    const languages = direction === DirectionOptions.MAIN ? getLangsDirection(lang1, lang2) : getLangsDirection(lang2, lang1);

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

export default TestSidebar