import React from 'react'
import SetCard from './FlashcardSetCard'

import FlashcardSetsFilters from './FlashcardSetsFilters';

function FlashcardSetsSearch({ dictionary }: { dictionary?: any }) {
    return (
        <div id='flashcardSetsSearch' className="mt-16">
            <FlashcardSetsFilters dictionary={dictionary} />
            {renderResults()}
        </div>
    )

    function renderResults() {
        return (
            <div className="mt-12 my-10 w-[1100px]">
                <div className="flex justify-between">
                    <SetCard></SetCard>
                    <SetCard></SetCard>
                    <SetCard></SetCard>
                </div>
                <div className="flex justify-between mt-12">
                    <SetCard></SetCard>
                    <SetCard></SetCard>
                    <SetCard></SetCard>
                </div>
            </div>
        )
    }
}

export default FlashcardSetsSearch