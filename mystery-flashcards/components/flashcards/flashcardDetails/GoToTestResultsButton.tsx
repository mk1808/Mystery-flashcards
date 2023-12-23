"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function GoToTestResultsButton({ dictionary, author, flashcardSetId }: { dictionary: any, author: any, flashcardSetId: any }) {
    const onGoToTest = () => router.push(`/flashcards/${flashcardSetId}/edit`)
    const router = useRouter();
    return (
        <button className="btn btn-primary btn-sm ml-2" onClick={onGoToTest}>
            Zobacz 
        </button>
    )
}

export default GoToTestResultsButton