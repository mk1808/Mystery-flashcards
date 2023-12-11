import TrainingCardContent from '@/components/learn/training/TrainingCardContent'
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { getFlashcardSetRequest } from '@/utils/client/ApiUtils';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { NextRequest } from 'next/server';
import React, { ReactNode } from 'react'
import { cookies } from 'next/headers'

export default async function LearnTraining({ params }: { params: { id: string, locale:string } }) {
  const tempId = "656a2c5d573e1d09a12fd05a";
  const dictionary = await fetchDictionary(params.locale);
  const flashcardSet = await getFlashcardSetRequest(tempId/*params.id*/);
  return (
    <TrainingCardContent dictionary={dictionary} flashcardSet={flashcardSet}/>
  )
  
}