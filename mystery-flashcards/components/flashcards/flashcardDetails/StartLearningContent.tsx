import { isFieldValid } from '@/utils/client/FormUtils';
import React from 'react'
import StartLearningForm from './StartLearningForm';

function StartLearningContent({ dictionary, flashcardSet, locale }: { dictionary: any, flashcardSet: any, locale: string }) {
    return (
        <div className='my-3'>
            <div className='mb-1'>{dictionary.common.selectLearningModeAndDirection}</div>
            <StartLearningForm dictionary={dictionary} flashcardSet={flashcardSet} locale={locale} />
        </div>
    )
}

export default StartLearningContent