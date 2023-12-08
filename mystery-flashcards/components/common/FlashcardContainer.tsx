import { FlashcardT } from '@/models/Flashcard'
import React from 'react'
import { TrashIcon } from "@heroicons/react/24/outline";

function FlashcardContainer({
  card,
  renderInput,
  renderTextarea,
  onDelete
}: {
  card: FlashcardT,
  renderInput: any,
  renderTextarea: any,
  onDelete?: () => any
}) {
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
        {renderDeleteIcon()}
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

  function renderDeleteIcon() {
    return onDelete && (
      <div className='absolute top-5 right-8 cursor-pointer'>
        <TrashIcon className="h-6 w-6 text-red-500" onClick={onDelete} />
      </div>
    )
  }
}

export default FlashcardContainer