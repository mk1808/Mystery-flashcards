import SingleSidebarInfo from '@/components/common/SingleSidebarInfo'
import SingleSidebarStat from '@/components/common/SingleSidebarStat'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function LearnTestSidebar({ params }: { params: { id: String } }) {
  return (
    <div>
      {renderTitleAndTags()}
      <div className="divider"></div>
      <SingleSidebarInfo title="Liczba kart" value="20"/>
      <SingleSidebarInfo title="Języki" value="pl -> ang"/>
      <SingleSidebarInfo title="Poziom" value="A2"/>
      <div className="divider"></div>
      {renderStatIcon()}
      <SingleSidebarStat title="Liczba odpowiedzi" value="10"/>
      <SingleSidebarStat title="Postęp" value="50%"/>
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

  function renderStatIcon() {
    return (
      <div className='flex justify-center'>
        <div className='py-[4px] px-[8px] bg-base-100 border border-base-100 rounded '>
          <ChartBarIcon className="h-8 w-8 text-primary" />
        </div>
      </div>
    )
  }
}