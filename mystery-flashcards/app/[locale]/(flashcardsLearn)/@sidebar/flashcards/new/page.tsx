import React from 'react'
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

export default function NewFlashcardsSidebar({ params }: { params: { id: String } }) {
  return (
    <div>
      <h1 className="text-4xl text-center mt-3 mb-8">Nowa kolekcja</h1>
      <div className="divider"></div>
      {renderSingleInfo("Liczba kart", "20")}
      {renderInput()}
      {renderInput()}
      {renderInput()}
      {renderInput()}
      {renderInput()}
      {renderInput()}

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

  function renderInput() {
    return (
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">What is your name?</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
      </label>
    )
  }
}