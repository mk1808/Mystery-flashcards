import TestSidebar from '@/components/learn/test/TestSidebar';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

export default async function LearnTestSidebar({ params }: { params: { id: string, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  return <TestSidebar dictionary={dictionary} />
}