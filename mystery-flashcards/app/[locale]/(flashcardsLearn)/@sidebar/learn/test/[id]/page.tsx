"use client"
import SingleSidebarInfo from '@/components/common/SingleSidebarInfo'
import LearnStats from '@/components/learn/LearnStats';
import useTestStore from '@/stores/useTestStore';
import React from 'react'

export default function LearnTestSidebar({ params }: { params: { id: String } }) {
  const { flashcardSet } = useTestStore((state) => state.flashcardSet);
  const { testAnswers } = useTestStore((state) => state);
  const { testFlashcards } = useTestStore((state) => state);

  const progress = (testAnswers.length * 100.0 / testFlashcards?.length).toFixed(1) + "%";

  const statsValues = [
    {
      text: "Liczba odpowiedzi",
      value: testAnswers.length
    },
    {
      text: "Postęp",
      value: progress
    }
  ]


  return (
    <div>
      {renderTitleAndTags()}
      <div className="divider"></div>
      <SingleSidebarInfo title="Liczba kart" value={flashcardSet?.flashcards?.length} />
      <SingleSidebarInfo title="Języki" value={`${flashcardSet?.lang1} -> ${flashcardSet?.lang2}`} />
      <SingleSidebarInfo title="Poziom" value={flashcardSet?.level} />
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