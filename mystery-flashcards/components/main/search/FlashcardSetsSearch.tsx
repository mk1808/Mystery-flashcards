"use client"
import React, { useState, useEffect } from 'react'
import SetCard from './FlashcardSetCard'

import FlashcardSetsFilters from './FlashcardSetsFilters';
import { searchFlashcardSets } from '@/utils/client/ApiUtils';
import { FlashcardSetT } from '@/models/FlashcardSet';
import useLocaleStore from '@/stores/useLocaleStore';

function FlashcardSetsSearch() {
    const { dictionary } = useLocaleStore(state => state);
    const [searchResults, setSearchResults] = useState<FlashcardSetT[] | null>(null)

    useEffect(() => {
        search({});
        const target = document.location.hash;
        if (target) {
            document.querySelector(target)?.scrollIntoView();
        }
    }, [])

    function search(data: FlashcardSearchDto) {
        setSearchResults(null);
        searchFlashcardSets(data).then(setSearchResults)
    }

    return (
        <div id='flashcardSetsSearch' className="mt-16">
            <FlashcardSetsFilters search={search} />
            {renderResults()}
        </div>
    )

    function renderResults() {
        if (searchResults === null) {
            return renderLoader();
        } else if (searchResults.length === 0) {
            return renderNoData();
        }
        return renderCards();
    }

    function renderLoader() {
        return (
            <div className="mt-20 mb-52 flex justify-center text-4xl font-bold text-secondary">
                <span className="loading loading-ball loading-lg" />
            </div>
        )
    }

    function renderNoData() {
        return (
            <div className="mt-20 mb-52 flex justify-center text-4xl font-bold text-secondary ">
                {dictionary.common.noSearchResult}
            </div>
        )
    }

    function renderCards() {
        return (
            <div className="mt-12 my-10 grid cards3:w-[1100px] grid-cols-1 md:grid-cols-2 cards3:grid-cols-3 gap-x-4 md:gap-x-3 gap-y-14 justify-items-center">
                {searchResults?.map(renderCard)}
            </div>
        )
    }

    function renderCard(flashcardSet: FlashcardSetT) {
        return <SetCard flashcardSet={flashcardSet} key={flashcardSet._id} />
    }
}

export default FlashcardSetsSearch