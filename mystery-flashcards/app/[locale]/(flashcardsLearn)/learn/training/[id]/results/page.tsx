import ResultTable from '@/components/learn/training/ResultTable';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

export default async function LearnTrainingResults({ params }: { params: { id: string, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  const view = "TRAINING_RESULT"
  return (
    <ResultTable view={view} dictionary={dictionary} locale={params.locale}/>

  )
}
