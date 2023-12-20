"use client"
import SingleSidebarInfo from '@/components/common/SingleSidebarInfo';
import LearnStats from '@/components/learn/LearnStats';
import useTrainingStore from '@/stores/useTrainingStore';
import React from 'react'

export default function TrainingSidebar({
    dictionary
}: {
    dictionary: any
}) {
    const { flashcardSet } = useTrainingStore((state) => state.flashcardSet);
    const { result } = useTrainingStore((state) => state);
    const { roundFlashcards } = useTrainingStore((state) => state);
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
        },
        {
            text: dictionary.common.cardsInRoundCount,
            value: roundFlashcards?.length ?? 0
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
                <div className="flex">
                    {flashcardSet?.hashtags.map((tag: any) => <div key={tag} className="badge badge-secondary badge-outline mr-2">{tag}</div>)}
                </div>
            </>
        )
    }
}
