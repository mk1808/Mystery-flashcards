'use client'
import FlashcardContainer from '@/components/common/FlashcardContainer';
import { FlashcardT } from '@/models/Flashcard';
import { HeartIcon } from '@heroicons/react/24/outline';
import React from 'react'

export default function NewFlashcards({ params }: { params: { id: String } }) {
  const singleFlashcard: FlashcardT = {
    wordLang1: "słowo",
    wordLang2: "word",
    description1: "Jakiś opis słowa",
    description2: "Some description"
  }

  const flashcards: FlashcardT[] = Array(20).fill(singleFlashcard);

  function onDelete() {
    console.log("onDelete")
  }

  return (
    <>
      <div className="w-[1000px]">
        {renderActionButtons()}
        {flashcards.map(card => <FlashcardContainer key={card.wordLang1} card={card} renderInput={renderInput}
          renderTextarea={renderTextarea} onDelete={onDelete}
        />)}
      </div>
      <div>FlashcardsDetails {params.id}</div>
    </>
  )

  function renderActionButtons() {
    return (
      <div className="mb-12 flex justify-end">
        <button className="btn btn-secondary mr-10">Anuluj</button>
        <button className="btn btn-primary">Zapisz</button>
      </div>
    )
  }

  function renderInput(label: any = "What is your name?") {
    return (
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
      </label>
    )
  }

  function renderTextarea() {
    return (
      <label className="form-control">
        <div className="label">
          <span className="label-text">Your bio</span>
        </div>
        <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
      </label>
    )
  }
}
