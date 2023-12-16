"use client"
import SingleSidebarStat from '@/components/common/SingleSidebarStat'
import StatisticsIcon from '@/components/common/StatisticsIcon'
import LearnStats from '@/components/learn/LearnStats'
import useTrainingStore from '@/stores/useTrainingStore'
import React from 'react'

export default function LearnTrainingResultsSidebar({ params }: { params: { id: String } }) {
  const { flashcardSet } = useTrainingStore((state) => state.flashcardSet);
  const { result } = useTrainingStore((state) => state);
  const { roundFlashcards } = useTrainingStore((state) => state);
  const statsValues = [
    {
      text: "Liczba odpowiedzi", value: result?.allCount
    },
    {
      text: "Liczba poprawnych odpowiedzi", value: result?.validCount
    },
    {
      text: "% poprawnych odpowiedzi", value: result?.resultPercent
    },
    {
      text: "Liczba kart w rundzie", value: roundFlashcards?.length ?? 0
    }
  ]
  return (
    <div>
      {renderTitle()}
      <div className="divider"></div> 
      <h1 className="text-3xl text-center mt-3 mb-8">Wyniki nauki <br /> Kolekcja: Zwierzęta</h1>
     
      <LearnStats stats = {statsValues}/>
      <br />
    </div>
  )

  function renderTitle() {
    return (
      <>
        <h1 className="text-4xl text-center mt-3 mb-8">Gratulacje! Zdobyłeś 20 pkt!</h1>
        <h1 className="text-2xl text-center mt-3 mb-8">Twój obecny poziom to Wilk. <br /> Do kolejnego poziomu brakuje 100pkt</h1>
      </>
    )
  }
}