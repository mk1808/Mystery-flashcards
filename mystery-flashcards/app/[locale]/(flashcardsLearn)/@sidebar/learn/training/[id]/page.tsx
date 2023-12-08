import SingleSidebarInfo from '@/components/common/SingleSidebarInfo';
import SingleSidebarStat from '@/components/common/SingleSidebarStat';
import StatisticsIcon from '@/components/common/StatisticsIcon';
import { ChartBarIcon } from "@heroicons/react/24/outline";
import React from 'react'

export default function LearnTrainingSidebar({ params }: { params: { id: String } }) {
  return (
    <div>
      {renderTitleAndTags()}
      <div className="divider"></div>
      <SingleSidebarInfo title="Liczba kart" value="20"/>
      <SingleSidebarInfo title="Języki" value="pl -> ang"/>
      <SingleSidebarInfo title="Poziom" value="A2"/>
      <div className="divider"></div>
      <StatisticsIcon/>
      <SingleSidebarStat title="Liczba odpowiedzi" value="10"/>
      <SingleSidebarStat title="Liczba poprawnych odpowiedzi" value="8"/>
      <SingleSidebarStat title="% poprawnych odpowiedzi" value="80"/>
      <br />
    </div>
  )

  function renderTitleAndTags() {
    return (
      <>
        <h1 className="text-4xl text-center mt-3 mb-8">Zwierzęta</h1>
        <div className="flex">
          <div className="badge badge-secondary badge-outline mr-2">nowe</div>
          <div className="badge badge-secondary badge-outline mr-2">podstawy</div>
          <div className="badge badge-secondary badge-outline mr-2">szkolne</div>
        </div>
      </>
    )
  }
}

