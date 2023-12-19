import { isFieldValid } from '@/utils/client/FormUtils';
import React from 'react'
import StartLearningForm from './StartLearningForm';

function StartLearningContent({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
    return (
        <div className='my-3'>
            <div className='mb-1'>{dictionary.common.selectLearningModeAndDirection}</div>
            <StartLearningForm dictionary={dictionary} flashcardSet={flashcardSet} />
        </div>
    )
}

export default StartLearningContent