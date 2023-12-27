"use client"
import useLocaleStore from '@/stores/useLocaleStore';
import { useRouter } from 'next/navigation';
import React from 'react'

function GoToTestResultsButton({ flashcardSetId }: { flashcardSetId: string }) {
    const { dictionary, locale } = useLocaleStore(state => state);
    const router = useRouter();
    const onGoToTest = () => router.push(`/${locale}/learn/test/${flashcardSetId}/results`)

    return (
        <button className="btn btn-primary btn-sm ml-2" onClick={onGoToTest}>
            {dictionary.common.see}
        </button>
    )
}

export default GoToTestResultsButton