import React from 'react'

export default function LearnTest({ params }: { params: { id: String } }) {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className='grid grid-rows-2'>
        <div className='self-end'>
          <h1 className="text-3xl my-3 ">{"card.wordLang1"}</h1>
        </div>
        <div><p>{"card.description1"}</p></div>
      </div>
      <div className='flex items-center'>
        <div className="divider divider-horizontal ml-0"></div>
        <div className="w-full h-full grid grid-rows-2">

          <div className="self-end">
            <input type="text" placeholder="Podaj odpowiedź" className="input input-bordered w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
