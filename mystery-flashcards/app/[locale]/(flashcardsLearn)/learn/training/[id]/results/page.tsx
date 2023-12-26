import ResultTable from '@/components/learn/training/ResultTable';
import React from 'react'

export default async function LearnTrainingResults() {
  const view = "TRAINING_RESULT"
  return (
    <ResultTable view={view} />

  )
}
