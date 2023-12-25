import React from 'react'
import NewFlashcardForm from '@/components/flashcards/NewFlashcardForm';
import NewFlashcardNumber from '@/components/flashcards/NewFlashcardNumber';
import useLocaleStore from '@/stores/useLocaleStore';

export default async function NewFlashcardsSidebar() {
  const { dictionary } = useLocaleStore(state => state);

  return (
    <div>
      <h1 className="text-4xl text-center mt-3 mb-8">{dictionary.common.newCollection}</h1>
      <div className="divider"></div>
      <NewFlashcardNumber />
      <NewFlashcardForm />
    </div>
  )
}