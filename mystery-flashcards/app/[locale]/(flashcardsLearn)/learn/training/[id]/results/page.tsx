import ResultTable from '@/components/learn/training/ResultTable';
import useTrainingStore from '@/stores/useTrainingStore';
import React from 'react'

export default function LearnTrainingResults({ params }: { params: { id: String } }) {
  const view = "TRAINING_RESULT"
  return (
    <ResultTable view={view} />

  )
}
