import React from 'react'
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

export default function NewFlashcardsSidebar({ params }: { params: { id: String } }) {
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
      {renderSingleInfo("Twórca", "admin0101")}
      {renderSingleInfo("Data dodania", "20.02.2023")}
      {renderSingleInfo("Popularność", "100")}
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
}