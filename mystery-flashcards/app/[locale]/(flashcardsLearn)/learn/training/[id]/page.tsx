import TrainingCardContent from '@/components/learn/training/TrainingCardContent'
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactNode } from 'react'

export default async function LearnTraining({ params }: { params: { id: string, locale:string } }) {
  const dictionary = await fetchDictionary(params.locale);
  return (
    <TrainingCardContent dictionary={dictionary}/>
  )
  
}