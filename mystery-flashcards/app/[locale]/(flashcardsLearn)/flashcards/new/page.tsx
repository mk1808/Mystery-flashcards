import NewFlashcardButtons from '@/components/flashcards/NewFlashcardButtons';
import NewFlashcardListForm from '@/components/flashcards/NewFlashcardListForm';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

async function NewFlashcards({ params }: { params: { id: String, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);

  return (
    <div className="h-full">
      <NewFlashcardButtons dictionary={dictionary} locale={params.locale} />
      <NewFlashcardListForm dictionary={dictionary} />
    </div>
  )
}

export default NewFlashcards;
