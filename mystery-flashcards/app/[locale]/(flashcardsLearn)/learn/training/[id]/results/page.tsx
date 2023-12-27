import ResultTable from '@/components/learn/training/ResultTable';
import { LearnViewOptions } from '@/enums/LearnViewOptions';
import React from 'react'

async function LearnTrainingResults() {

    return (
        <ResultTable view={LearnViewOptions.TRAINING_RESULT} />
    )
}

export default LearnTrainingResults