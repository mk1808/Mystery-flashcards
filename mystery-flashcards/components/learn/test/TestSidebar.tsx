"use client"
import Badges from '@/components/common/Badges';
import SingleSidebarInfo from '@/components/common/SingleSidebarInfo'
import LearnStats from '@/components/learn/LearnStats';
import useTestStore from '@/stores/useTestStore';
import React from 'react'

export default function TestSidebar({
    dictionary
}: {
    dictionary: any
}) {
    const { flashcardSet } = useTestStore((state) => state.flashcardSet);
    const { testAnswers } = useTestStore((state) => state);
    const { testFlashcards } = useTestStore((state) => state);

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

    return (
        <div>
            {renderTitleAndTags()}
            <div className="divider"></div>
            <SingleSidebarInfo title={dictionary.common.flashcardsCount} value={flashcardSet?.flashcards?.length} />
            <SingleSidebarInfo title={dictionary.common.languages} value={`${flashcardSet?.lang1} -> ${flashcardSet?.lang2}`} />
            <SingleSidebarInfo title={dictionary.common.level} value={flashcardSet?.level} />
            <div className="divider"></div>
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