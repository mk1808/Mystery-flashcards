import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import { ChartBarIcon } from "@heroicons/react/24/outline";
import React from 'react'

export default function LearnTrainingSidebar({ params }: { params: { id: String } }) {
  return (
    <div>
      <h1 className="text-4xl text-center mt-3 mb-8">Zwierzęta</h1>
      <div className="flex">
        <div className="badge badge-secondary badge-outline mr-2">nowe</div>
        <div className="badge badge-secondary badge-outline mr-2">podstawy</div>
        <div className="badge badge-secondary badge-outline mr-2">szkolne</div>
      </div>
      <div className="divider"></div>
      {renderSingleInfo("Liczba kart", "20")}
      {renderSingleInfo("Języki", "pl -> ang")}
      {renderSingleInfo("Poziom", "A2")}
      <div className="divider"></div>
      <div className=' flex justify-center'>
        <div className='py-[4px] px-[8px] bg-base-100 border border-base-100 rounded '>    <ChartBarIcon className="h-8 w-8 text-primary" /></div>

      </div>

      {renderSingleStat("Liczba odpowiedzi", "10")}
      {renderSingleStat("Liczba poprawnych odpowiedzi", "8")}
      {renderSingleStat("% poprawnych odpowiedzi", "80")}
      <br />
    </div>
  )

  function renderSingleInfo(title: string, value: string) {
    return (
      <div className="my-3 flex items-center">
        <ChevronDoubleRightIcon className="h-5 w-5 mr-2 text-gray-500" />
        <span className="text-xl">{title}</span>
        <span className="text-xl">: &nbsp;</span>
        <span className="text-xl">{value}</span>
      </div>
    )
  }

  function renderSingleStat(title: string, value: string) {
    return (
      <div className="my-3 flex items-center justify-between">
        <div className='w-[210px]'>
          <span className="text-xl">{title}</span>
        </div>
        <div className="text-right">
          <div className="text-2xl">{value}</div>
        </div>
      </div>
    )
  }
}

