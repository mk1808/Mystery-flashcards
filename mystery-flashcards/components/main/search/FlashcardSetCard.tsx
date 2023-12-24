import React from 'react'
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { FlashcardSetT } from '@/models/FlashcardSet'
import FlashcardSetCardContainer from './FlashcardSetCardContainer'
import Badges from '@/components/common/Badges'
import { HeartIcon } from "@heroicons/react/24/solid"

function FlashcardSetCard({
    flashcardSet,
    dictionary,
    locale
}: {
    flashcardSet: FlashcardSetT,
    dictionary: any,
    locale: string
}) {
    const { userFlashcard } = flashcardSet;
    const isType = userFlashcard && userFlashcard.type != "NONE"
    const isFav = userFlashcard?.isFavorite;
    const translatedType = dictionary.common[userFlashcard?.type!];
    return (
        <FlashcardSetCardContainer flashcardSet={flashcardSet} locale={locale}>
            <div className="card w-[350px] bg-base-100 shadow-xl">
                <div className="absolute left-[120px] -top-6" >
                    <div className="w-[110px] h-[50px] bg-primary flex items-center justify-center text-base-100 rounded-xl shadow-xl">
                        {flashcardSet.lang1} &nbsp;
                        <ArrowRightIcon className="h-4 w-4" /> &nbsp;
                        {flashcardSet.lang2}
                    </div>
                </div>
                {renderUserFlashcardInfo()}
                <div className="card-body mt-4">
                    <h2 className="card-title">{flashcardSet.name}</h2>
                    <div className="flex">
                        <PaperAirplaneIcon className="h-6 w-6 me-3" /> <span>{flashcardSet.level}</span>
                    </div>
                    <div className="flex">
                        <PaperAirplaneIcon className="h-6 w-6 me-3" /> <span>{dictionary.common.flashcardsCount}: {flashcardSet.flashcards?.length ?? 0}</span>
                    </div>
                    <Badges badges={flashcardSet.hashtags!} />
                </div>
            </div>
        </FlashcardSetCardContainer>
    )

    function renderUserFlashcardInfo() {
        return (
            <span className='absolute right-[3px] top-[10px] p-1 flex flex-col items-end'>
                {isType &&
                    <span className='border border-2 border-primary rounded-xl p-1'>
                        {translatedType ? translatedType?.toString().toUpperCase() : ""}
                    </span>
                }
                {isFav && <HeartIcon className="h-6 w-6 mt-1" />}
            </span>
        )
    }
}

export default FlashcardSetCard