"use client"
import React, { useState, useEffect } from 'react'
import SetCard from './FlashcardSetCard'

import FlashcardSetsFilters from './FlashcardSetsFilters';
import { searchFlashcardSets } from '@/utils/client/ApiUtils';
import { FlashcardSetT } from '@/models/FlashcardSet';

function FlashcardSetsSearch({ dictionary }: { dictionary?: any }) {
    const [searchResults, setSearchResults] = useState<FlashcardSetT[]>([])

    useEffect(() => {
        search({});
        const target = document.location.hash;
        if (target) {
            document.querySelector(target)?.scrollIntoView();
        }
    }, [])

    function search(data: FlashcardSearchDto) {
        searchFlashcardSets(data).then(setSearchResults)
    }

    return (
        <div id='flashcardSetsSearch' className="mt-16">
            <FlashcardSetsFilters search={search} dictionary={dictionary} />
            {renderResults()}
        </div>
    )

    function renderResults() {
        return (
            <div className="mt-12 my-10 w-[1100px] grid grid-cols-3 gap-4 gap-y-14">
                {searchResults.map(renderCard)}
            </div>
        )
    }

    function renderCard(flashcardSet: FlashcardSetT) {
        return <SetCard flashcardSet={flashcardSet} />
    }
}

export default FlashcardSetsSearch