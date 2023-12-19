import React from 'react'
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { fetchDictionary } from '@/dictionaries/dictionaries';
import NewFlashcardForm from '@/components/flashcards/NewFlashcardForm';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';
import SingleSidebarInfo from '@/components/common/SingleSidebarInfo';
import NewFlashcardNumber from '@/components/flashcards/NewFlashcardNumber';

export default async function NewFlashcardsSidebar({ params }: { params: { id: string, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);


  return (
    <div>
      <h1 className="text-4xl text-center mt-3 mb-8">{dictionary.common.newCollection}</h1>
      <div className="divider"></div>
      <NewFlashcardNumber dictionary={dictionary} />
      <NewFlashcardForm dictionary={dictionary} />
    </div>
  )
}