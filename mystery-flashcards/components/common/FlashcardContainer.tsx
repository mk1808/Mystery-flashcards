import { FlashcardT } from '@/models/Flashcard'
import React from 'react'

function FlashcardContainer({card}:{card:FlashcardT}) {
  return (
    <div className="card w-[1000px] bg-base-100 shadow-xl mb-10">
        <div className="card-body">
          <div className="grid grid-cols-2">
            <div>
              <h1 className="text-3xl my-3">{card.wordLang1}</h1>
              <p>{card.description1}</p>
            </div>
            <div className='flex'>
              <div className="divider divider-horizontal"></div>
              <div>
                <h1 className="text-3xl my-3">{card.wordLang2}</h1>
                <p>{card.description2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default FlashcardContainer