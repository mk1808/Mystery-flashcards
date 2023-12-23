"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function GoToTestResultsButton({
    dictionary,
    author,
    flashcardSetId,
    locale
}: {
    dictionary: any,
    author: any,
    flashcardSetId: any,
    locale: string
}) {
    const router = useRouter();
    const onGoToTest = () => router.push(`/${locale}/learn/test/${flashcardSetId}/results`)
    return (
        <button className="btn btn-primary btn-sm ml-2" onClick={onGoToTest}>
            {dictionary.common.see}
        </button>
    )
}

export default GoToTestResultsButton