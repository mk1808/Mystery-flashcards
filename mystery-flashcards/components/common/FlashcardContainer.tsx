import { FlashcardT } from '@/models/Flashcard'
import React from 'react'

function FlashcardContainer({ card, renderInput, renderTextarea }: { card: FlashcardT, renderInput: any, renderTextarea:any }) {
  return (
    <div className="card w-[1000px] bg-base-100 shadow-xl mb-10">
      <div className="card-body">
        <div className="flex justify-around">
          <div className="w-full justify-end">
            {renderLeftSide()}
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="w-full">
            {renderRightSide()}
          </div>
        </div>

      </div>
    </div>
  )

  function renderLeftSide() {
    if (renderInput != undefined) {
      return (
        <div>
          {renderInput()}
          {renderTextarea()}
        </div>
      );
    }
    return (
      <div>
        <h1 className="text-3xl my-3">{card.wordLang1}</h1>
        <p>{card.description1}</p>
      </div>
    );
  }

  function renderRightSide() {
    if (renderInput != undefined) {
      return (
        <div>
          {renderInput()}
          {renderTextarea()}
        </div>
      );
    }
    return (
      <div>
        <h1 className="text-3xl my-3">{card.wordLang2}</h1>
        <p>{card.description2}</p>
      </div>
    );
  }
}

export default FlashcardContainer