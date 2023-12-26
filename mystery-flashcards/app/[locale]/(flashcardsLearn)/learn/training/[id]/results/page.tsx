import ResultTable from '@/components/learn/training/ResultTable';
import React from 'react'

async function LearnTrainingResults() {
    const view = "TRAINING_RESULT"
    return (
        <ResultTable view={view} />
    )
}

export default LearnTrainingResults