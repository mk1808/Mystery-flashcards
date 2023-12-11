import React from 'react'
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { FlashcardSetT } from '@/models/FlashcardSet'

function FlashcardSetCard({
    flashcardSet
}: {
    flashcardSet: FlashcardSetT
}) {
    return (
        <div className="card w-[350px] bg-base-100 shadow-xl">
            <div className="absolute left-[120px] -top-6" >
                <div className="w-[110px] h-[50px] bg-primary flex items-center justify-center text-base-100 rounded-xl shadow-xl">
                    {flashcardSet.lang1} &nbsp;
                    <ArrowRightIcon className="h-4 w-4" /> &nbsp;
                    {flashcardSet.lang2}
                </div>
            </div>
            <div className="card-body mt-4">
                <h2 className="card-title">{flashcardSet.name}</h2>
                <div className="flex">
                    <PaperAirplaneIcon className="h-6 w-6 me-3" /> <span>{flashcardSet.level}</span>
                </div>
                <div className="flex justify-between">
                    {flashcardSet.hashtags?.map(renderHashtag)}
                </div>

                <p>If a dog chews shoes whose shoes does he choose?</p>
                {/*   <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
    </div>*/}
            </div>
        </div>
    )

    function renderHashtag(hashtag: string) {
        return <div className="badge badge-secondary badge-outline">{hashtag}</div>
    }
}

export default FlashcardSetCard