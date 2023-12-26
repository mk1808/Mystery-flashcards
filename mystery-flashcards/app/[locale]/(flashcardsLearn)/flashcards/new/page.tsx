import NewFlashcardButtons from '@/components/flashcards/NewFlashcardButtons';
import NewFlashcardListForm from '@/components/flashcards/NewFlashcardListForm';
import React from 'react'

async function NewFlashcards() {

  return (
    <div className="h-full">
      <NewFlashcardButtons />
      <NewFlashcardListForm />
    </div>
  )
}

export default NewFlashcards;
