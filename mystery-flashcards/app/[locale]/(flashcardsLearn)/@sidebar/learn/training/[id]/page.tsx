"use client"
import SingleSidebarInfo from '@/components/common/SingleSidebarInfo';
import SingleSidebarStat from '@/components/common/SingleSidebarStat';
import StatisticsIcon from '@/components/common/StatisticsIcon';
import useTrainingStore from '@/stores/useTrainingStore';
import { ChartBarIcon } from "@heroicons/react/24/outline";
import React from 'react'

export default function LearnTrainingSidebar({ params }: { params: { id: String } }) {
  const {flashcardSet} = useTrainingStore((state) => state.flashcardSet);
  const {result} = useTrainingStore((state) => state.result);
  console.log("result:", flashcardSet)
  return (
    <div>
      {renderTitleAndTags()}
      <div className="divider"></div>
      <SingleSidebarInfo title="Liczba kart" value={flashcardSet?.flashcards?.length}/>
      <SingleSidebarInfo title="Języki" value={`${flashcardSet?.lang1} -> ${flashcardSet?.lang2}`}/>
      <SingleSidebarInfo title="Poziom" value={flashcardSet?.level}/>
      <div className="divider"></div>
      <StatisticsIcon/>
      <SingleSidebarStat title="Liczba odpowiedzi" value={result?.validCount}/>
      <SingleSidebarStat title="Liczba poprawnych odpowiedzi" value={result?.allCount}/>
      <SingleSidebarStat title="% poprawnych odpowiedzi" value={result?.resultPercent}/>
      <br />
    </div>
  )

  function renderTitleAndTags() {
    return (
      <>
        <h1 className="text-4xl text-center mt-3 mb-8">{flashcardSet?.name}</h1>
        <div className="flex">
          {flashcardSet?.hashtags.map((tag:any)=> <div key ={tag} className="badge badge-secondary badge-outline mr-2">{tag}</div>)}
        </div>
      </>
    )
  }
}

