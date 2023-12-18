"use client"
import SingleSidebarStat from '@/components/common/SingleSidebarStat'
import StatisticsIcon from '@/components/common/StatisticsIcon'
import LearnStats from '@/components/learn/LearnStats'
import useAuthStore from '@/stores/useAuthStore'
import useTrainingStore from '@/stores/useTrainingStore'
import { findNextRang, getRang } from '@/utils/server/userRangUtils'
import React from 'react'

export default function LearnTrainingResultsSidebar({ params }: { params: { id: String } }) {
  const { flashcardSet } = useTrainingStore((state) => state.flashcardSet);
  const { result } = useTrainingStore((state) => state);
  const { finalResult } = useTrainingStore((state) => state);
  const { roundFlashcards } = useTrainingStore((state) => state);
  const currentUser = useAuthStore(state => state.currentUser);
  const statsValues = [
    {
      text: "Liczba odpowiedzi", value: result?.allCount
    },
    {
      text: "Liczba poprawnych odpowiedzi", value: result?.validCount
    },
    {
      text: "Poprawnych odpowiedzi", value: result?.resultPercent + "%"
    }
  ]
  return (
    <div>
      {renderTitle()}
      <div className="divider"></div>
      <h1 className="text-3xl text-center mt-3 mb-8">Wyniki nauki <br /> Kolekcja: {flashcardSet?.name}</h1>

      <LearnStats stats={statsValues} />
      <br />
    </div>
  )

  function renderTitle() {
    const range = getRang(currentUser?.rang!)
    const toNextLevel = findNextRang(currentUser?.rang!).pointsFrom - currentUser?.points!;
    return (
      <>
        <h1 className="text-4xl text-center mt-3 mb-8">Gratulacje! Zdobyłeś {finalResult?.newPoints} pkt!</h1>
        <h1 className="text-2xl text-center mt-3 mb-8">Twój obecny poziom to {range?.name}. <br /> Do kolejnego poziomu brakuje {toNextLevel} pkt</h1>
      </>
    )
  }
}