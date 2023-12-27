import React from 'react'
import StartLearningForm from './StartLearningForm';
import useLocaleStore from '@/stores/useLocaleStore';
import { FlashcardSetT } from '@/models/FlashcardSet';

function StartLearningContent({ flashcardSet }: { flashcardSet: FlashcardSetT }) {
    const { dictionary } = useLocaleStore(state => state);

    return (
        <div className='my-3'>
            <div className='mb-1'>{dictionary.common.selectLearningModeAndDirection}</div>
            <StartLearningForm flashcardSet={flashcardSet} />
        </div>
    )
}

export default StartLearningContent