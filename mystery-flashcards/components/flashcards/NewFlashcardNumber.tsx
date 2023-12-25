"use client"
import React from 'react'
import SingleSidebarInfo from '../common/SingleSidebarInfo'
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore'

function NewFlashcardNumber({ dictionary }: { dictionary: any }) {
    const { flashcardsList } = useNewFlashcardSetStore((state) => state)
    return (
        <SingleSidebarInfo title="Liczba kart" value={flashcardsList.length} />
    )
}

export default NewFlashcardNumber