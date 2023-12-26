"use client"
import React from 'react'
import SingleSidebarInfo from '../common/SingleSidebarInfo'
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore'
import useLocaleStore from '@/stores/useLocaleStore';

function NewFlashcardNumber() {
    const { dictionary } = useLocaleStore(state => state);
    const { flashcardsList } = useNewFlashcardSetStore((state) => state)
    return (
        <SingleSidebarInfo title={dictionary.common.flashcardsCount} value={flashcardsList.length} />
    )
}

export default NewFlashcardNumber