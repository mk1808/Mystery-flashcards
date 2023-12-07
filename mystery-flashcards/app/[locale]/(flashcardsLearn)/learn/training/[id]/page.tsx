import React from 'react'

export default function LearnTraining({ params }: { params: { id: String } }) {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className='flex flex-col justify-center'>
        <div>
          <h1 className="text-3xl my-3">{"card.wordLang1"}</h1>
          <p>{"card.description1"}</p>
        </div>

      </div>
      <div className='flex  items-center'>
        <div className="divider divider-horizontal ml-0"></div>
        <div className="w-full">

              <input type="text" placeholder="Podaj odpowiedź" className="input input-bordered w-full" />
     
        </div>
      </div>
    </div>

  )
}
/*<div>LearnTraining {params.id}</div>*/